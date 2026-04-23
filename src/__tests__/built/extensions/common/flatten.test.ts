import { THIS1 } from '@bemedev/dev-utils/build-tests';

describe('All imports', () => {
  describe('#02 => extensions', () => {
    describe('#04 => ./extensions/common/flatten', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions/common/flatten`).then(m => {
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
        'mapArray',
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

      const SUCCESS = ['flatten'] as const;

      describe('#01 => Not inside flatten', () => {
        test.fails.each(FAILS.map(value => [value]))(
          '#%# => %s does not exist',
          helper,
        );
      });

      describe('#02 => Inside flatten', () => {
        test.each(SUCCESS.map(value => [value]))(
          '#%# => %s exists',
          helper,
        );
      });
    });
  });
});
