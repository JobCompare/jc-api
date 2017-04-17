/* eslint-disable no-console*/
const bunyan = require('bunyan');
const Bunyan2Loggly = require('bunyan-loggly');
const config = require('./utils/Configuration');

const logglyLogger = (name, level) => {
  const logglyConfig = {
    token: config.get('LOGGING_TOKEN'),
    subdomain: config.get('LOGGING_SUBDOMAIN'),
    tags: config.get('LOGGING_TAGS'),
  };
  return bunyan.createLogger({
    name,
    level: level || config.get('LOGGING_LEVEL'),
    streams: [{
      type: 'raw',
      stream: new Bunyan2Loggly(logglyConfig),
    }, {
      stream: process.stdout,
    }],
  });
};

const nativeLogger = () => ({
  debug: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
});

const loggers = {
  native: nativeLogger,
  loggly: logglyLogger,
};

class Logging {
  static logger(name, level) {
    return loggers[config.get('LOGGING_LOGGER')](name, level);
  }
}

module.exports = Logging;
