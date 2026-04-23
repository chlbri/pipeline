import { THIS1 } from '@bemedev/dev-utils/build-tests';

describe('All imports', () => {
  describe('#02 => extensions', () => {
    describe('#03 => ./extensions/common', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions/common`).then(m => {
          const _fn = m[fn];
          expect(_fn).toBeDefined();
          expect(_fn).toBeTypeOf('function');
          return _fn;
        });
      };

      const FAILS = [
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

      const SUCCESS = [
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

      describe('#01 => Not inside common', () => {
        test.fails.each(FAILS.map(value => [value]))(
          '#%# => %s does not exist',
          helper,
        );
      });

      describe('#02 => Inside common', () => {
        test.each(SUCCESS.map(value => [value]))(
          '#%# => %s exists',
          helper,
        );
      });
    });
  });
});
