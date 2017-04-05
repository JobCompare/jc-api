/* eslint-disable global-require, no-console*/
const express = require('express');
const bugsnag = require('bugsnag');
const config = require('config');
const connect = require('camo').connect;
const Router = require('./app/routes/Router');
const logging = require('./logging').logger('server', config.get('Logging.level'));
const HTTPError = require('./HTTPError');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const app = express();
const parser = {
  body: require('body-parser'),
  cookie: require('cookie-parser'),
};

if (NODE_ENV !== 'development') {
  bugsnag.register(config.get('Bugsnag.key'));
  app.use(bugsnag.requestHandler);
}

const { username, password } = config.get('MongoDB');
const DEFAULT_DB_URI = `mongodb://${username}:${password}@ds145790.mlab.com:45790/local-api-db`;
connect(process.env.MONGODB_URI || DEFAULT_DB_URI).then(() => {
  logging.info('Database connected successfully.');
});

app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());

app.use('/apidoc', express.static(`${__dirname}/apidoc`));

Router.factory(app);

if (NODE_ENV !== 'development') {
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
