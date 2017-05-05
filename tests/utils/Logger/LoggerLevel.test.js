const assert = require('assert');

const LoggerLevel = require('../../../utils/Logger/LoggerLevel');

describe('LoggerLevel', () => {
  before(() => {
    assert.equal(LoggerLevel.TRACE, 'trace');
    assert.equal(LoggerLevel.DEBUG, 'debug');
    assert.equal(LoggerLevel.INFO, 'info');
    assert.equal(LoggerLevel.WARN, 'warn');
    assert.equal(LoggerLevel.ERROR, 'error');
    assert.equal(LoggerLevel.FATAL, 'fatal');

    ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach((level) => {
      assert.ok(LoggerLevel.levels().has(level));
    });
  });

  describe('#getValue()', () => {
    it('should return a numeric value of each level', () => {
      const levels = LoggerLevel.levels();
      const values = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 };

      levels.forEach((level) => {
        const result = LoggerLevel.getValue(level);
        assert.equal(typeof result, 'number');
        assert.equal(result, values[level]);
      });
    });

    it('should return 0 if input is invalid', () => {
      assert.equal(LoggerLevel.getValue(), 0);
      assert.equal(LoggerLevel.getValue(null), 0);
      assert.equal(LoggerLevel.getValue(''), 0);
      assert.equal(LoggerLevel.getValue(undefined), 0);
      assert.equal(LoggerLevel.getValue(NaN), 0);
      assert.equal(LoggerLevel.getValue(Infinity), 0);
      assert.equal(LoggerLevel.getValue([]), 0);
      assert.equal(LoggerLevel.getValue({}), 0);
    });
  });

  describe('#getColor()', () => {
    it('should return a color name of each level', () => {
      const levels = LoggerLevel.levels();
      const values = { trace: 'cyan', debug: 'cyan', info: 'reset', warn: 'yellow', error: 'red', fatal: 'red' };

      levels.forEach((level) => {
        const result = LoggerLevel.getColor(level);
        assert.equal(typeof result, 'string');
        assert.equal(result, values[level]);
      });
    });

    it('should return \'reset\' if input is invalid', () => {
      const expected = 'reset';

      assert.equal(LoggerLevel.getColor(), expected);
      assert.equal(LoggerLevel.getColor(null), expected);
      assert.equal(LoggerLevel.getColor(''), expected);
      assert.equal(LoggerLevel.getColor(undefined), expected);
      assert.equal(LoggerLevel.getColor(NaN), expected);
      assert.equal(LoggerLevel.getColor(Infinity), expected);
      assert.equal(LoggerLevel.getColor([]), expected);
      assert.equal(LoggerLevel.getColor({}), expected);
    });
  });

  describe('#get().lambda', () => {
    it('should return a function name (associated with console) of each level', () => {
      const levels = LoggerLevel.levels();
      const values = { trace: 'trace', debug: 'trace', info: 'info', warn: 'warn', error: 'error', fatal: 'error' };

      levels.forEach((level) => {
        const result = LoggerLevel.get(level).lambda;
        assert.equal(typeof result, 'string');
        assert.equal(result, values[level]);
      });
    });

    it('should return \'log\' as a function name if input is invalid', () => {
      const expected = 'log';

      assert.equal(LoggerLevel.get().lambda, expected);
      assert.equal(LoggerLevel.get(null).lambda, expected);
      assert.equal(LoggerLevel.get('').lambda, expected);
      assert.equal(LoggerLevel.get(undefined).lambda, expected);
      assert.equal(LoggerLevel.get(NaN).lambda, expected);
      assert.equal(LoggerLevel.get(Infinity).lambda, expected);
      assert.equal(LoggerLevel.get([]).lambda, expected);
      assert.equal(LoggerLevel.get({}).lambda, expected);
    });
  });

  describe('#compare()', () => {
    it('should return -1 if first input is smaller than second input', () => {
      const levels = LoggerLevel.levels().toArray();

      for (let i = 1; i < levels.length; i++) {
        const result = LoggerLevel.compare(levels[i-1], levels[i]);
        assert.equal(result, -1);
      }
    });

    it('should return 1 if first input is larger than second input', () => {
      const levels = LoggerLevel.levels().toArray();

      for (let i = 0; i < levels.length-1; i++) {
        const result = LoggerLevel.compare(levels[i+1], levels[i]);
        assert.equal(result, 1);
      }
    });

    it('should return 0 if first input is equal to second input', () => {
      const levels = LoggerLevel.levels();

      levels.forEach((level) => {
        const result = LoggerLevel.compare(level, level);
        assert.equal(result, 0);
      });
    });

    it('should treat invalid input as 0', () => {
      assert.equal(LoggerLevel.compare(undefined, 'warn'), -1);
      assert.equal(LoggerLevel.compare('error', undefined), 1);
      assert.equal(LoggerLevel.compare(undefined, undefined), 0);
    });
  });

  describe('#equals()', () => {
    it('should return true if two levels have same numeric values', () => {
      const levels = LoggerLevel.levels();

      levels.forEach((level) => {
        const result = LoggerLevel.equals(level, level);
        assert.equal(result, true);
      });
    });

    it('should return false if two levels have different numeric values', () => {
      const levels = LoggerLevel.levels().toArray();

      for (let i = 0; i < levels.length-1; i++) {
        const result = LoggerLevel.equals(levels[i+1], levels[i]);
        assert.equal(result, false);
      }
    });
  });

  describe('#valid()', () => {
    it('should return true for all valid levels', () => {
      const levels = LoggerLevel.levels();

      levels.forEach((level) => {
        const result = LoggerLevel.valid(level);
        assert.equal(result, true);
      });
    });

    it('should return false for any invalid levels', () => {
      assert.equal(LoggerLevel.valid(), false);
      assert.equal(LoggerLevel.valid(null), false);
      assert.equal(LoggerLevel.valid(''), false);
      assert.equal(LoggerLevel.valid(undefined), false);
      assert.equal(LoggerLevel.valid(NaN), false);
      assert.equal(LoggerLevel.valid(Infinity), false);
      assert.equal(LoggerLevel.valid([]), false);
      assert.equal(LoggerLevel.valid({}), false);
    });
  });
});
