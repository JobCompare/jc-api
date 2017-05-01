/* eslint-disable global-require */
const express = require('express');
const bugsnag = require('bugsnag');
const cors = require('cors');
const connect = require('camo').connect;

const config = require('./utils/Configuration');
const Router = require('./app/routes/Router');
const logger = require('./utils/Logging').logger('server', config.get('LOGGING_LEVEL'));
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
  if (config.get('BUGSNAG_KEY')) {
    bugsnag.register(config.get('BUGSNAG_KEY'), { releaseStage: SERVER_ENV, sendCode: true });
    app.use(bugsnag.requestHandler);
  } else {
    logger.warn('No Bugsnag key found.');
  }
}

app.use(cors());

(async () => {
  try {
    const username = config.get('MONGODB_USERNAME') || '';
    const password = config.get('MONGODB_PASSWORD') || '';
    const DEFAULT_DB_URI = `mongodb://${username}:${password}@ds145790.mlab.com:45790/local-api-db`;

    await connect(process.env.MONGODB_URI || DEFAULT_DB_URI);
    logger.info('Database connected successfully.');
  } catch (err) {
    logger.error(`${err.name}: ${err.errmsg}`);
  }
})();

app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());

app.use('/apidoc', express.static(`${__dirname}/apidoc`));

Router.factory(app);

if (SERVER_ENV !== 'local' && config.get('BUGSNAG_KEY')) {
  bugsnag.onBeforeNotify((notification) => {
    // only notify on 500
    try {
      const error = JSON.parse(notification.events[0].exceptions[0].message);
      return error.status === 500;
    } catch (error) {
      logger.error(error);
      return true;
    }
  });
  app.use(bugsnag.errorHandler);
}

app.use((err, req, res, next) => {
  const error = err && err.name === 'HTTPError' ? err : new HTTPError(500, err);
  logger.error(error);
  res.status(error.status).json(error.getError ? error.getError() : error);
});

process.on('unhandledRejection', error => logger.error(error));

app.listen(PORT, '0.0.0.0', () => {
  const env = `${NODE_ENV.charAt(0).toUpperCase()}${NODE_ENV.slice(1)}`;
  logger.info(`${env} Mode`);
  logger.info(`Server started at: port ${PORT}`);
});
