const { Map, Set } = require('immutable');

const lookup = Map({
  trace: {
    color: 'cyan',
    value: 10,
    lambda: 'trace',
  },
  debug: {
    color: 'cyan',
    value: 20,
    lambda: 'trace',
  },
  info: {
    color: 'reset',
    value: 30,
    lambda: 'info',
  },
  warn: {
    color: 'yellow',
    value: 40,
    lambda: 'warn',
  },
  error: {
    color: 'red',
    value: 50,
    lambda: 'error',
  },
  fatal: {
    color: 'red',
    value: 60,
    lambda: 'error',
  },
});

class LoggerLevel {
  static get(key) {
    switch (key) {
      case 'hide': return { color: 'reset', value: Infinity };
      case 'show': return { color: 'reset', value: -Infinity };
      default: return lookup.get(key) || { color: 'reset', value: 0, lambda: 'log' };
    }
  }

  static getValue(key) {
    return this.get(key).value;
  }

  static getColor(key) {
    return this.get(key).color;
  }

  static compare(a, b) {
    return Math.sign(this.getValue(a) - this.getValue(b));
  }

  static equals(a, b) {
    return this.compare(a, b) === 0;
  }

  static levels() {
    return Set(lookup.keySeq().toArray());
  }

  static valid(key) {
    return !!lookup.get(key);
  }
}

/* LoggerLevel static constants */
LoggerLevel.TRACE = 'trace';
LoggerLevel.DEBUG = 'debug';
LoggerLevel.INFO = 'info';
LoggerLevel.WARN = 'warn';
LoggerLevel.ERROR = 'error';
LoggerLevel.FATAL = 'fatal';

module.exports = LoggerLevel;
