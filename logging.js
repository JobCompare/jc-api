/* eslint-disable no-console*/
const bunyan = require('bunyan');
const Bunyan2Loggly = require('bunyan-loggly');
const config = require('config');

const logglyLogger = (name, level) => {
  const logglyConfig = {
    token: config.get('Logging.token'),
    subdomain: config.get('Logging.subdomain'),
    tags: config.get('Logging.tags'),
  };
  return bunyan.createLogger({
    name,
    level: level || config.get('Logging.level'),
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
    return loggers[config.get('Logging.logger')](name, level);
  }
}

module.exports = Logging;
