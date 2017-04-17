/* eslint-disable global-require, no-console*/
const express = require('express');
const bugsnag = require('bugsnag');
const cors = require('cors');
const connect = require('camo').connect;
const config = require('./utils/Configuration');
const Router = require('./app/routes/Router');
const logging = require('./logging').logger('server', config.get('Logging.level'));
const HTTPError = require('./HTTPError');

const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_ENV = process.env.SERVER_ENV || 'local';
const PORT = process.env.PORT || 8080;

const app = express();
const parser = {
  body: require('body-parser'),
  cookie: require('cookie-parser'),
};

if (SERVER_ENV !== 'local') {
  bugsnag.register(config.get('BUGSNAG_KEY'), { releaseStage: SERVER_ENV, sendCode: true });
  app.use(bugsnag.requestHandler);
}

app.use(cors());

(async () => {
  try {
    const username = config.get('MONGODB_USERNAME');
    const password = config.get('MONGODB_PASSWORD');
    const DEFAULT_DB_URI = `mongodb://${username}:${password}@ds145790.mlab.com:45790/local-api-db`;
    await connect(process.env.MONGODB_URI || DEFAULT_DB_URI);
    logging.info('Database connected successfully.');
  } catch (err) {
    logging.error(err);
  }
})();

app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());

app.use('/apidoc', express.static(`${__dirname}/apidoc`));

Router.factory(app);

if (SERVER_ENV !== 'local') {
  bugsnag.onBeforeNotify((notification) => {
    // only notify on 500
    try {
      const error = JSON.parse(notification.events[0].exceptions[0].message);
      return error.status === 500;
    } catch (error) {
      return true;
    }
  });
  app.use(bugsnag.errorHandler);
}

app.use((err, req, res, next) => {
  const error = err && err.name === 'HTTPError' ? err : new HTTPError(500, err);
  logging.error(error);
  res.status(error.status).json(error.getError ? error.getError() : error);
});

process.on('unhandledRejection', (error) => {
  console.log(error);
});

app.listen(PORT, '0.0.0.0', () => {
  logging.info(`${NODE_ENV} mode`);
  logging.info(`Server started at ${PORT}`);
});
