/* eslint-disable import/no-dynamic-require, global-require */
const { forOwn: _forOwn } = require('lodash');
const defaults = require('../config/default.json') || {};

class Configuration {
  static load(env='development') {
    const config = Object.assign({}, defaults, require(`../config/${env}.json`) || {});

    _forOwn(config, (value, key) => {
      if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
        process.env[key] = value;
      } else {
        process.env[key] = JSON.stringify(value);
      }
    });
  }

  static get(key='') {
    const [head, ...properties] = key.split('.').map(c => c.trim());
    const init = ((value) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    })(process.env[head]);

    try {
      return properties.reduce((acc, property) => acc[property], init);
    } catch (e) {
      return undefined;
    }
  }
}

Configuration.load(process.env.NODE_ENV);

module.exports = Configuration;
