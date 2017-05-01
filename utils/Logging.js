/* eslint-disable no-console */
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
  const colors = Map({ debug: 'cyan', warn: 'yellow', error: 'red' });
  const levels = Set(['info', 'debug', 'warn', 'error']);
  const result = { log: console.log };
  levels.forEach((level) => {
    result[level] = (...inputs) => {
      if (inputs.length === 0) {
        return; // do not log when no inputs has been passed in
      }
      const prefix = `[${level.toUpperCase()}]\t`.bold[colors.get(level) || 'reset'];
      const contents = inputs.map((input) => {
        if (typeof input === 'string') {
          return input.split('\n').join(`\n${prefix} `);
        }
        return input;
      });
      contents.unshift(prefix);
      (console[level] || console.log)(...contents);
    };
  });
  return result;
};

class Logging {
  static logger(name, level='debug') {
    return ({ native, loggly })[config.get('LOGGING_LOGGER') || 'native'](name, level);
  }
}

module.exports = Logging;
