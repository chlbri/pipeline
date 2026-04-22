import {
  THIS1,
  addTarball,
  cleanup,
} from '@bemedev/dev-utils/build-tests';
import { createTests } from '@bemedev/dev-utils/vitest-extended';
import { add, division, exponent, times } from './extensions';
import { $ } from 'zx';

describe('All imports', () => {
  beforeAll(async () => {
    vi.useFakeTimers();
    await $`pnpm run build`;
    return addTarball();
  });
  afterAll(cleanup);

  describe('#01 => pipe exists at paths', () => {
    const { acceptation, success } = createTests.withImplementation(
      undefined as any,
      {
        name: 'pipe',
        instanciation: async () => {
          return import(`${THIS1}`).then(m => m.pipe);
        },
        transform: async (pipe: any) => await pipe(2),
      },
    );

    describe('#00 => Acceptation', acceptation);

    describe(
      '#01 => Sync',
      success(
        {
          invite: '(2+1)*2 = 6',
          parameters: [add(1), times(2)] as any,
          expected: 6,
        },
        {
          invite: '((2+1)*2)-3 = 3',
          parameters: [add(1), times(2), add(-3)] as any,
          expected: 3,
        },
        {
          invite: '(((2+1)*2)-3)/2 = 1.5',
          parameters: [add(1), times(2), add(-3), division(2)] as any,
          expected: 1.5,
        },
        {
          invite: '((((2+1)*2)-3)/2)^2 = 2.25',
          parameters: [
            add(1),
            times(2),
            add(-3),
            division(2),
            exponent(2),
          ] as any,
          expected: 2.25,
        },
        {
          invite: '((((((((2+1)*2)-3)/2)^2)+10)/2)-1)*3/5 = 3.075',
          parameters: [
            add(1),
            times(2),
            add(-3),
            division(2),
            exponent(2),
            add(10),
            division(2),
            add(-1),
            times(3),
            division(5),
          ] as any,
          expected: 3.075,
        },
        {
          invite: 'Add 1 20 times',
          parameters: Array.from({ length: 20 }, () => add(1)) as any,
          expected: 22,
        },
      ),
    );

    const addAsync = (n: number) => async (x: number) =>
      Promise.resolve(x + n);

    describe(
      '#01 => Async',
      success(
        {
          invite: '(2+1)*2 = 6',
          parameters: [addAsync(1), times(2)] as any,
          expected: 6,
        },
        {
          invite: '((2+1)*2)-3 = 3',
          parameters: [addAsync(1), times(2), addAsync(-3)] as any,
          expected: 3,
        },
        {
          invite: '(((2+1)*2)-3)/2 = 1.5',
          parameters: [
            addAsync(1),
            times(2),
            addAsync(-3),
            division(2),
          ] as any,
          expected: 1.5,
        },
        {
          invite: '((((2+1)*2)-3)/2)^2 = 2.25',
          parameters: [
            addAsync(1),
            times(2),
            addAsync(-3),
            division(2),
            exponent(2),
          ] as any,
          expected: 2.25,
        },
        {
          invite: '((((((((2+1)*2)-3)/2)^2)+10)/2)-1)*3/5 = 3.075',
          parameters: [
            addAsync(1),
            times(2),
            addAsync(-3),
            division(2),
            exponent(2),
            addAsync(10),
            division(2),
            addAsync(-1),
            times(3),
            division(5),
          ] as any,
          expected: 3.075,
        },
        {
          invite: 'AddAsync 1 (20 times)',
          parameters: Array.from({ length: 20 }, () => addAsync(1)) as any,
          expected: 22,
        },
        {
          invite: 'AddAsync 1 (1000 times)',
          parameters: Array.from({ length: 1000 }, () =>
            addAsync(1),
          ) as any,
          expected: 1002,
        },
      ),
    );
  });

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
        'mapArray',
        'operation',
        'add',
        'times',
        'division',
        'modulo',
        'exponent',
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
        'add',
        'times',
        'division',
        'modulo',
        'exponent',
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
        'add',
        'times',
        'division',
        'modulo',
        'exponent',
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

    describe('#04 => ./extensions/booleans', () => {
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
        'operation',
        'add',
        'times',
        'division',
        'modulo',
        'exponent',
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

    describe('#05 => ./extensions/numbers/arithmetic', () => {
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
        'add',
        'times',
        'division',
        'modulo',
        'exponent',
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

    describe('#06 => ./extensions/numbers/checkers', () => {
      const helper = async (fn: string) => {
        return import(`${THIS1}/extensions/numbers/checkers`).then(m => {
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
        'operation',
        'add',
        'times',
        'division',
        'modulo',
        'exponent',
        'toUpperCase',
        'toLowerCase',
        'trim',
        'capitalize',
        'escapeRegExp',
        'replaceAll',
        'concat',
      ] as const;

      const SUCCESS = ['isZero', 'isNotZero', 'compare', 'sign'] as const;

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
