require('colors');

const { Map, Set } = require('immutable');

const Logger = require('./Logger');

class NativeLogger extends Logger {
  constructor(name='', level='') {
    super(name, level);
    this.init();
  }

  init() {
    const colors = Map({ debug: 'cyan', warn: 'yellow', error: 'red' });
    const levels = Set(['info', 'trace', 'debug', 'warn', 'error', 'fatal']);

    // disable native logger in staging or production (use Bunyan instead)
    if ((process.env.NODE_ENV || 'development') !== 'development') {
      levels.forEach((level) => {
        this[level] = () => {};
      });
      return;
    }

    levels.forEach((level) => {
      this[level] = (...inputs) => {
        if (inputs.length === 0) return; // do not log when no inputs has been passed in

        const prefix = `[${level.toUpperCase()}]\t`.bold[colors.get(level) || 'reset'];
        const contents = inputs.map((input) => {
          if (typeof input === 'string') {
            return input.split('\n').join(`\n${prefix} `);
          }
          return input;
        });
        contents.unshift(prefix);

        if (level === 'trace' || level === 'debug') {
          level = 'log';
        } else if (level === 'fatal') {
          level = 'error';
        }

        this.outstream[level](...contents);
      };
    });
  }
}

module.exports = NativeLogger;
