import { THIS1 } from '@bemedev/dev-utils/build-tests';

describe('All imports', () => {
  describe('#02 => extensions', () => {
    describe('#12 => ./extensions/numbers/arithmetic', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions/numbers/arithmetic`).then(m => {
          const _fn = m[fn];
          expect(_fn).toBeDefined();
          expect(_fn).toBeTypeOf('function');
          return _fn;
        });
      };

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
        'isZero',
        'isNotZero',
        'compare',
        'sign',
        'toUpperCase',
        'toLowerCase',
        'trim',
        'capitalize',
        'escapeRegExp',
        'replaceAll',
        'concat',
      ] as const;

      const SUCCESS = [
        'operation',
        'addBy',
        'timesBy',
        'divisionBy',
        'moduloBy',
        'exponentBy',
        'multiplyBy',
      ] as const;

      describe('#01 => Not inside arithmetic', () => {
        test.fails.each(FAILS.map(value => [value]))(
          '#%# => %s does not exist',
          helper,
        );
      });

      describe('#02 => Inside arithmetic', () => {
        test.each(SUCCESS.map(value => [value]))(
          '#%# => %s exists',
          helper,
        );
      });
    });
  });
});
