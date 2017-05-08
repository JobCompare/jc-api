const assert = require('assert');
const sinon = require('sinon');

const LoggerFactory = require('../../../utils/Logger/LoggerFactory');
const Logger = require('../../../utils/Logger/Logger');
const NativeLogger = require('../../../utils/Logger/NativeLogger');
const LogglyLogger = require('../../../utils/Logger/LogglyLogger');

const config = require('../../../utils/Configuration');

describe('LoggerLevel', () => {
  describe('#create()', () => {
    const stubs = {
      config: {},
    };

    before(() => {
      stubs.config.get = sinon.stub(config, 'get');
    });

    after(() => {
      stubs.config.get.restore();
    });

    it('should return an instance of NativeLogger if logger is \'native\'', () => {
      stubs.config.get.withArgs('LOGGING_LOGGER').returns('native');
      assert.ok(LoggerFactory.create() instanceof NativeLogger);
    });

    xit('should return an instance of LogglyLogger if logger is \'loggly\'', () => {
      stubs.config.get.withArgs('LOGGING_LOGGER').returns('loggly');
      assert.ok(LoggerFactory.create() instanceof LogglyLogger);
    });

    it('should return an instance of Logger for any other logger types', () => {
      stubs.config.get.withArgs('LOGGING_LOGGER').returns('default');
      assert.ok(LoggerFactory.create() instanceof Logger);
    });
  });
});
