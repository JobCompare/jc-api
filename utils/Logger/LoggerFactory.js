const config = require('../Configuration');
const Logger = require('./Logger');
const LogglyLogger = require('./LogglyLogger');
const NativeLogger = require('./NativeLogger');

class LoggerFactory {
  static create(name='', level='') {
    const type = config.get('LOGGING_LOGGER') || 'native';
    switch (type.toLowerCase().trim()) {
      case 'loggly': return new LogglyLogger(name, level);
      case 'native': return new NativeLogger(name, level);
      default: return new Logger(name, level);
    }
  }
}

module.exports = LoggerFactory;
