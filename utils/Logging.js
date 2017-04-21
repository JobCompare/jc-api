/* eslint-disable no-console*/
require('colors');

const bunyan = require('bunyan');
const Bunyan2Loggly = require('bunyan-loggly');
const { Map, Set } = require('immutable');

const config = require('./Configuration');

const loggly = (name, level) => {
  const logglyConfig = {
    token: config.get('LOGGING_TOKEN') || '',
    subdomain: config.get('LOGGING_SUBDOMAIN') || '',
    tags: config.get('LOGGING_TAGS') || '',
  };
  return bunyan.createLogger({
    name,
    level,
    streams: [{
      type: 'raw',
      stream: new Bunyan2Loggly(logglyConfig),
    }, {
      stream: process.stdout,
    }],
  });
};

const native = () => {
  const colors = Map({ warn: 'yellow', error: 'red' });
  const levels = Set(['log', 'info', 'warn', 'error', 'debug']);
  const result = {};
  levels.forEach((level) => {
    result[level] = level !== 'log' ? (input) => {
      const prefix = `[${level.toUpperCase()}]`.bold;
      const text = input[colors.get(level) || 'reset'];
      return console[level](`${prefix}\t${text.replace('\n', '\n\t')}`);
    } : console.log;
  });
  return result;
};

class Logging {
  static logger(name, level='debug') {
    return ({ native, loggly })[config.get('LOGGING_LOGGER') || 'native'](name, level);
  }
}

module.exports = Logging;
