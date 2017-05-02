require('colors');

const { Map, Set } = require('immutable');

const Logger = require('./Logger');

class NativeLogger extends Logger {
  constructor(name='', level='') {
    super(name, level);
    this.display = true;
    this.init();
  }

  init() {
    const colors = Map({ debug: 'cyan', warn: 'yellow', error: 'red', fatal: 'red' });
    const levels = Set(['info', 'trace', 'debug', 'warn', 'error', 'fatal']);

    levels.forEach((level) => {
      this[level] = (...inputs) => {
        if (inputs.length === 0) return ''; // do not log when no inputs has been passed in

        const prefix = `[${level.toUpperCase()}]\t`.bold[colors.get(level) || 'reset'];
        const contents = inputs.map((input) => {
          if (typeof input === 'string') {
            return input.split('\n').join(`\n${prefix} `);
          }
          return input;
        });
        contents.unshift(prefix);

        const lambda = (() => {
          if (level === 'trace' || level === 'debug' || !this.outstream[level]) {
            return 'log';
          } else if (level === 'fatal') {
            return 'error';
          }
          return level;
        })();

        if (this.display) {
          this.outstream[lambda](...contents);
        }
        return contents.join(' ');
      };
    });
  }
}

module.exports = NativeLogger;
