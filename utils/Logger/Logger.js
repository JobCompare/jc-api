/* eslint-disable no-console */
const config = require('../Configuration');

class Logger {
  constructor(name='', level=config.get('LOGGING_LEVEL')) {
    this.name = name;
    this.level = level || 'debug';
    this.outstream = console;
  }

  log(...inputs) {
    return this.outstream.log(...inputs);
  }

  info(...inputs) {
    return this.outstream.info(...inputs);
  }

  debug(...inputs) {
    return this.log(...inputs);
  }

  warn(...inputs) {
    return this.outstream.warn(...inputs);
  }

  error(...inputs) {
    return this.outstream.error(...inputs);
  }

  fatal(...inputs) {
    return this.error(...inputs);
  }
}

module.exports = Logger;
