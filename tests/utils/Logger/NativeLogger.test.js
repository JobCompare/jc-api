const assert = require('assert');
const sinon = require('sinon');

const config = require('../../../utils/Configuration');
const NativeLogger = require('../../../utils/Logger/NativeLogger');

describe('Logger', () => {
  const stubs = {
    config: {},
    console: {},
  };

  let logger;

  before(() => {
    logger = new NativeLogger('test');
    stubs.config.get = sinon.stub(config, 'get');
    stubs.config.get.withArgs('LOGGING_LEVEL').returns('');
    stubs.console.log = sinon.stub(logger.outstream, 'log');
    stubs.console.trace = sinon.stub(logger.outstream, 'trace');
    stubs.console.info = sinon.stub(logger.outstream, 'info');
    stubs.console.warn = sinon.stub(logger.outstream, 'warn');
    stubs.console.error = sinon.stub(logger.outstream, 'error');
  });

  afterEach(() => {
    stubs.console.log.reset();
    stubs.console.trace.reset();
    stubs.console.info.reset();
    stubs.console.warn.reset();
    stubs.console.error.reset();
  });

  after(() => {
    stubs.config.get.restore();
    stubs.console.log.restore();
    stubs.console.trace.restore();
    stubs.console.info.restore();
    stubs.console.warn.restore();
    stubs.console.error.restore();
  });

  describe('#log()', () => {
    it('should execute console.log', () => {
      logger.level = undefined;
      logger.log();
      assert.ok(stubs.console.log.calledOnce);
    });
  });

  describe('#trace()', () => {
    it('should not execute console.trace when hidden', () => {
      logger.level = 'hide';
      logger.trace();
      assert.ok(stubs.console.trace.notCalled);
    });

    it('should not execute console.trace when input is empty', () => {
      logger.level = 'trace';
      logger.trace();
      assert.ok(stubs.console.trace.notCalled);
    });

    it('should execute console.trace when input exists', () => {
      logger.level = 'trace';
      logger.trace('');
      assert.ok(stubs.console.trace.calledOnce);
    });

    it('should execute console.trace on non-strings', () => {
      logger.level = 'trace';

      logger.trace({});
      logger.trace(0);
      logger.trace(false);
      logger.trace(null);
      logger.trace(undefined);
      logger.trace([]);
      logger.trace(NaN);
      logger.trace(Infinity);
      logger.trace(() => {});

      assert.equal(stubs.console.trace.callCount, 9);
    });
  });

  describe('#debug()', () => {
    it('should not execute console.trace when hidden', () => {
      logger.level = 'hide';
      logger.debug();
      assert.ok(stubs.console.trace.notCalled);
    });

    it('should not execute console.trace when input is empty', () => {
      logger.level = 'debug';
      logger.debug();
      assert.ok(stubs.console.trace.notCalled);
    });

    it('should execute console.trace when input exists', () => {
      logger.level = 'debug';
      logger.debug('');
      assert.ok(stubs.console.trace.calledOnce);
    });

    it('should execute console.trace on non-strings', () => {
      logger.level = 'debug';

      logger.debug({});
      logger.debug(0);
      logger.debug(false);
      logger.debug(null);
      logger.debug(undefined);
      logger.debug([]);
      logger.debug(NaN);
      logger.debug(Infinity);
      logger.debug(() => {});

      assert.equal(stubs.console.trace.callCount, 9);
    });
  });

  describe('#info()', () => {
    it('should not execute console.info when hidden', () => {
      logger.level = 'hide';
      logger.info();
      assert.ok(stubs.console.info.notCalled);
    });

    it('should not execute console.info when input is empty', () => {
      logger.level = 'info';
      logger.info();
      assert.ok(stubs.console.info.notCalled);
    });

    it('should execute console.info when input exists', () => {
      logger.level = 'info';
      logger.info('');
      assert.ok(stubs.console.info.calledOnce);
    });

    it('should execute console.info on non-strings', () => {
      logger.level = 'info';

      logger.info({});
      logger.info(0);
      logger.info(false);
      logger.info(null);
      logger.info(undefined);
      logger.info([]);
      logger.info(NaN);
      logger.info(Infinity);
      logger.info(() => {});

      assert.equal(stubs.console.info.callCount, 9);
    });
  });

  describe('#warn()', () => {
    it('should not execute console.warn when hidden', () => {
      logger.level = 'hide';
      logger.warn();
      assert.ok(stubs.console.warn.notCalled);
    });

    it('should not execute console.warn when input is empty', () => {
      logger.level = 'warn';
      logger.warn();
      assert.ok(stubs.console.warn.notCalled);
    });

    it('should execute console.warn when input exists', () => {
      logger.level = 'warn';
      logger.warn('');
      assert.ok(stubs.console.warn.calledOnce);
    });

    it('should execute console.warn on non-strings', () => {
      logger.level = 'warn';

      logger.warn({});
      logger.warn(0);
      logger.warn(false);
      logger.warn(null);
      logger.warn(undefined);
      logger.warn([]);
      logger.warn(NaN);
      logger.warn(Infinity);
      logger.warn(() => {});

      assert.equal(stubs.console.warn.callCount, 9);
    });
  });

  describe('#error()', () => {
    it('should not execute console.error when hidden', () => {
      logger.level = 'hide';
      logger.error();
      assert.ok(stubs.console.error.notCalled);
    });

    it('should not execute console.error when input is empty', () => {
      logger.level = 'error';
      logger.error();
      assert.ok(stubs.console.error.notCalled);
    });

    it('should execute console.error when input exists', () => {
      logger.level = 'error';
      logger.error('');
      assert.ok(stubs.console.error.calledOnce);
    });

    it('should execute console.error on non-strings', () => {
      logger.level = 'error';

      logger.error({});
      logger.error(0);
      logger.error(false);
      logger.error(null);
      logger.error(undefined);
      logger.error([]);
      logger.error(NaN);
      logger.error(Infinity);
      logger.error(() => {});

      assert.equal(stubs.console.error.callCount, 9);
    });
  });

  describe('#fatal()', () => {
    it('should not execute console.error when hidden', () => {
      logger.level = 'hide';
      logger.fatal();
      assert.ok(stubs.console.error.notCalled);
    });

    it('should not execute console.error when input is empty', () => {
      logger.level = 'error';
      logger.fatal();
      assert.ok(stubs.console.error.notCalled);
    });

    it('should execute console.error when input exists', () => {
      logger.level = 'error';
      logger.fatal('');
      assert.ok(stubs.console.error.calledOnce);
    });

    it('should execute console.error on non-strings', () => {
      logger.level = 'fatal';

      logger.fatal({});
      logger.fatal(0);
      logger.fatal(false);
      logger.fatal(null);
      logger.fatal(undefined);
      logger.fatal([]);
      logger.fatal(NaN);
      logger.fatal(Infinity);
      logger.fatal(() => {});

      assert.equal(stubs.console.error.callCount, 9);
    });
  });
});

