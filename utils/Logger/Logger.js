/* eslint-disable no-console */
const config = require('../Configuration');
const LoggerLevel = require('./LoggerLevel');

class Logger {
  constructor(name='', level=config.get('LOGGING_LEVEL')) {
    this.name = name;
    this.level = LoggerLevel.valid(level) ? level : 'debug';
    this.outstream = Object.assign({}, console);
  }

  log(...inputs) {
    this.outstream.log.apply(console, inputs);
  }

  trace(...inputs) {
    if (LoggerLevel.compare(this.level, LoggerLevel.TRACE) <= 0) {
      this.outstream.trace.apply(console, inputs);
    }
  }

  debug(...inputs) {
    if (LoggerLevel.compare(this.level, LoggerLevel.DEBUG) <= 0) {
      this.outstream.trace.apply(console, inputs);
    }
  }

  info(...inputs) {
    if (LoggerLevel.compare(this.level, LoggerLevel.INFO) <= 0) {
      this.outstream.info.apply(console, inputs);
    }
  }

  warn(...inputs) {
    if (LoggerLevel.compare(this.level, LoggerLevel.WARN) <= 0) {
      this.outstream.warn.apply(console, inputs);
    }
  }

  error(...inputs) {
    if (LoggerLevel.compare(this.level, LoggerLevel.ERROR) <= 0) {
      this.outstream.error.apply(console, inputs);
    }
  }

  fatal(...inputs) {
    if (LoggerLevel.compare(this.level, LoggerLevel.FATAL) <= 0) {
      this.outstream.error.apply(console, inputs);
    }
  }
}

module.exports = Logger;
