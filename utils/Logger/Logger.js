/* eslint-disable no-console */
const config = require('../Configuration');
const LoggerLevel = require('./LoggerLevel');

class Logger {
  constructor(name='', level=config.get('LOGGING_LEVEL')) {
    this.name = name;
    this.level = level || 'debug';
    this.outstream = console;
  }

  log(...inputs) {
    const value = Infinity;
    if (LoggerLevel.compare(this.level, value) <= 0) {
      this.outstream.log(...inputs);
    }
  }

  trace(...inputs) {
    const value = LoggerLevel.get('trace').value;
    if (LoggerLevel.compare(this.level, value) <= 0) {
      this.outstream.error(...inputs);
    }
  }

  debug(...inputs) {
    const value = LoggerLevel.get('debug').value;
    if (LoggerLevel.compare(this.level, value) <= 0) {
      this.outstream.log(...inputs);
    }
  }

  info(...inputs) {
    const value = LoggerLevel.get('info').value;
    if (LoggerLevel.compare(this.level, value) <= 0) {
      this.outstream.info(...inputs);
    }
  }

  warn(...inputs) {
    const value = LoggerLevel.get('warn').value;
    if (LoggerLevel.compare(this.level, value) <= 0) {
      this.outstream.warn(...inputs);
    }
  }

  error(...inputs) {
    const value = LoggerLevel.get('error').value;
    if (LoggerLevel.compare(this.level, value) <= 0) {
      this.outstream.error(...inputs);
    }
  }

  fatal(...inputs) {
    const value = LoggerLevel.get('fatal').value;
    if (LoggerLevel.compare(this.level, value) <= 0) {
      this.outstream.error(...inputs);
    }
  }
}

module.exports = Logger;
