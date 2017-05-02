const bunyan = require('bunyan');
const Bunyan2Loggly = require('bunyan-loggly');

const Logger = require('./Logger');
const config = require('../Configuration');

class LogglyLogger extends Logger {
  constructor(name='', level='') {
    super(name, level);

    this.outstream = process.stdout;

    return bunyan.createLogger({
      name,
      level,
      streams: [{
        type: 'raw',
        stream: new Bunyan2Loggly({
          token: config.get('LOGGING_TOKEN') || '',
          subdomain: config.get('LOGGING_SUBDOMAIN') || '',
          tags: config.get('LOGGING_TAGS') || '',
        }),
      }, { stream: process.stdout }],
    });
  }

}

module.exports = LogglyLogger;
