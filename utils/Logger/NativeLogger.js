require('colors');

const Logger = require('./Logger');
const LoggerLevel = require('./LoggerLevel');

class NativeLogger extends Logger {
  constructor(name='', level='debug') {
    super(name, level);
    this.display = true;
    this.init();
  }

  init() {
    const { level: threshold, display: viewable } = this;
    const levels = LoggerLevel.levels();

    levels.forEach((level) => {
      this[level] = (...inputs) => {
        if (inputs.length === 0 || LoggerLevel.compare(threshold, level) > 0) {
          return ''; // do not log when no inputs has been passed in
        }

        const { color, lambda } = (LoggerLevel.get(level) || { color: 'reset', lambda: 'log' });
        const prefix = `[${level.toUpperCase()}]\t`.bold[color];
        const contents = inputs.map((input) => {
          if (typeof input === 'string') {
            return input.split('\n').join(`\n${prefix} `);
          }
          return input;
        });
        contents.unshift(prefix);

        if (viewable) {
          this.outstream[lambda](...contents);
        }
        return contents.join(' ');
      };
    });
  }
}

module.exports = NativeLogger;
