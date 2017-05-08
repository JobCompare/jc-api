require('colors');

const Logger = require('./Logger');
const LoggerLevel = require('./LoggerLevel');

const transform = (level, inputs=[]) => {
  const color = LoggerLevel.getColor(level);
  const prefix = `[${level.toUpperCase()}]\t`.bold[color];
  const contents = inputs.map((input) => {
    if (typeof input === 'string') {
      return input.split('\n').join(`\n${prefix} `);
    }
    return input;
  });
  contents.unshift(prefix);
  return contents;
};

class NativeLogger extends Logger {
  constructor(name='', level='debug') {
    super(name, level);
  }

  trace(...inputs) {
    const level = LoggerLevel.TRACE;

    if (inputs.length > 0 && LoggerLevel.compare(this.level, level) <= 0) {
      const contents = transform(level, inputs);
      super.trace(...contents);
    }
  }

  debug(...inputs) {
    const level = LoggerLevel.DEBUG;

    if (inputs.length > 0 && LoggerLevel.compare(this.level, level) <= 0) {
      const contents = transform(level, inputs);
      super.debug(...contents);
    }
  }

  info(...inputs) {
    const level = LoggerLevel.INFO;

    if (inputs.length > 0 && LoggerLevel.compare(this.level, level) <= 0) {
      const contents = transform(level, inputs);
      super.info(...contents);
    }
  }

  warn(...inputs) {
    const level = LoggerLevel.WARN;

    if (inputs.length > 0 && LoggerLevel.compare(this.level, level) <= 0) {
      const contents = transform(level, inputs);
      super.warn(...contents);
    }
  }

  error(...inputs) {
    const level = LoggerLevel.ERROR;

    if (inputs.length > 0 && LoggerLevel.compare(this.level, level) <= 0) {
      const contents = transform(level, inputs);
      super.error(...contents);
    }
  }

  fatal(...inputs) {
    const level = LoggerLevel.FATAL;

    if (inputs.length > 0 && LoggerLevel.compare(this.level, level) <= 0) {
      const contents = transform(level, inputs);
      super.fatal(...contents);
    }
  }
}

module.exports = NativeLogger;
