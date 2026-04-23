import { THIS1 } from '@bemedev/dev-utils/build-tests';

describe('All imports', () => {
  describe('#02 => extensions', () => {
    describe('#02 => ./extensions/numbers', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions/numbers`).then(m => {
          const _fn = m[fn];
          expect(_fn).toBeDefined();
          expect(_fn).toBeTypeOf('function');
          return _fn;
        });
      };

      const SUCCESS = [
        'operation',
        'addBy',
        'timesBy',
        'divisionBy',
        'moduloBy',
        'exponentBy',
        'multiplyBy',
        'isZero',
        'isNotZero',
        'compare',
        'sign',
      ] as const;

      const FAILS = [
        'identity',
        'isValue',
        'isNotValue',
        'voidAction',
        'tap',
        'map',
        'toggleMap',
        'flatten',
        'mapArray',
      ] as const;

      describe('#01 => Not inside numbers', () => {
        test.fails.each(FAILS.map(value => [value]))(
          '#%# => %s does not exist',
          helper,
        );
      });

      describe('#02 => Inside numbers', () => {
        test.each(SUCCESS.map(value => [value]))(
          '#%# => %s exists',
          helper,
        );
      });
    });
  });
});
