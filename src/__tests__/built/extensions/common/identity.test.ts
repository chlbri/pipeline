import { THIS1 } from '@bemedev/dev-utils/build-tests';

describe('All imports', () => {
  describe('#02 => extensions', () => {
    describe('#05 => ./extensions/common/identity', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions/common/identity`).then(m => {
          const _fn = m[fn];
          expect(_fn).toBeDefined();
          expect(_fn).toBeTypeOf('function');
          return _fn;
        });
      };

      const FAILS = [
        'isValue',
        'isNotValue',
        'flatten',
        'voidAction',
        'tap',
        'map',
        'toggleMap',
        'mapArray',
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
        'toggle',
        'toNumber',
        'toUpperCase',
        'toLowerCase',
        'trim',
        'capitalize',
        'escapeRegExp',
        'replaceAll',
        'concat',
      ] as const;

      const SUCCESS = ['identity'] as const;

      describe('#01 => Not inside identity', () => {
        test.fails.each(FAILS.map(value => [value]))(
          '#%# => %s does not exist',
          helper,
        );
      });

      describe('#02 => Inside identity', () => {
        test.each(SUCCESS.map(value => [value]))(
          '#%# => %s exists',
          helper,
        );
      });
    });
  });
});
