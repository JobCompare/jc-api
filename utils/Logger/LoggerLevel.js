const { Map, Set } = require('immutable');

const lookup = Map({
  trace: {
    color: 'cyan',
    value: 10,
    lambda: 'log',
  },
  debug: {
    color: 'cyan',
    value: 20,
    lambda: 'log',
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
    lambda: 'fatal',
  },
});

class LoggerLevel {
  static get(key) {
    return lookup.get(key);
  }

  static getValue(key) {
    const ref = this.get(key);
    return ref ? ref.value : 0;
  }

  static getColor(key) {
    const ref = this.get(key);
    return ref ? ref.color : 'reset';
  }

  static compare(a, b) {
    const numerator = this.getValue(a) - this.getValue(b);
    const denominator = Math.abs(numerator);
    return !denominator ? numerator : (numerator/denominator);
  }

  static equals(a, b) {
    return this.compare(a, b) === 0;
  }

  static levels() {
    return Set(lookup.keySeq().toArray());
  }

  static valid(key) {
    return !!this.get(key);
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
