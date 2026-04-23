import { THIS1 } from '@bemedev/dev-utils/build-tests';

describe('All imports', () => {
  describe('#02 => extensions', () => {
    describe('#11 => ./extensions/booleans', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions/booleans`).then(m => {
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
        'flatten',
        'mapArray',
        'map',
        'toggleMap',
        'operation',
        'add',
        'times',
        'division',
        'modulo',
        'exponent',
        'multiply',
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

      const SUCCESS = ['toggle', 'toNumber'] as const;

      describe('#01 => Not inside booleans', () => {
        test.fails.each(FAILS.map(value => [value]))(
          '#%# => %s does not exist',
          helper,
        );
      });

      describe('#02 => Inside booleans', () => {
        test.each(SUCCESS.map(value => [value]))(
          '#%# => %s exists',
          helper,
        );
      });
    });
  });
});
