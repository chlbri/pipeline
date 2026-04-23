import { THIS1 } from '@bemedev/dev-utils/build-tests';

describe('All imports', () => {
  describe('#02 => extensions', () => {
    describe('#01 => ./extensions', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions`).then(m => {
          const _fn = m[fn];
          expect(_fn).toBeDefined();
          expect(_fn).toBeTypeOf('function');
          return _fn;
        });
      };

      const SUCCESS = [
        'identity',
        'isValue',
        'isNotValue',
        'voidAction',
        'tap',
        'flatten',
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

      describe('#01 => Not inside extensions', () => {
        test.fails('pipe is not inside extensions', async () =>
          helper('pipe'));
      });

      describe('#02 => Inside extensions', () => {
        test.each(SUCCESS.map(value => [value]))(
          '#%# => %s exists',
          helper,
        );
      });
    });
  });
});
