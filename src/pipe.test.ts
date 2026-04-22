import { createTests } from '@bemedev/dev-utils/vitest-extended';
import { identity } from './extensions/common';
import { flatten, mapArray } from './extensions/fixtures';
import {
  add,
  division,
  exponent,
  times,
} from './extensions/numbers/arithmetic';
import {
  capitalize,
  concat,
  escapeRegExp,
  replaceAll,
  toLowerCase,
  toUpperCase,
  trim,
} from './extensions/strings';
import { pipe } from './pipe';
import type { TupleOfLength } from './types';

describe('pipe', () => {
  describe('#01 => Numbers, (test with 2)', () => {
    const { acceptation, success } = createTests(pipe, {
      transform: fn => fn(2),
    });

    describe('#00 => Acceptation', acceptation);
    describe(
      '#01 => Success',
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
          parameters: Array.from({ length: 20 }, () =>
            add(1),
          ) as TupleOfLength<(x: number) => number, 20>,
          expected: 22,
        },
      ),
    );
  });

  it('#02 => should handle string transformations', () => {
    const piped = pipe(
      trim,
      toUpperCase,
      toLowerCase,
      capitalize,
      escapeRegExp,
      concat('!'),
      concat('toRemove', 'toRemove', 'toRemove', 'toRemove', 'toRemove'),
      concat('toRemove2'),
      concat('toRemove2'),
      concat('toRemove3'),
      concat('toRemove3'),
      replaceAll('toRemove', '2', '3'),
    );
    expect(piped('  hello ')).toBe('Hello!');
  });

  describe('#03 => should handle objects', () => {
    it('#01 => simple object', () => {
      const piped = pipe(
        (obj: { a: number }) => ({ ...obj, b: obj.a + 1 }),
        obj => ({ ...obj, c: obj.b * 2 }),
      );
      expect(piped({ a: 1 })).toEqual({ a: 1, b: 2, c: 4 });
    });

    describe.concurrent('#02 => Complex MapArray', () => {
      const piped = pipe(
        (obj: { a: number }) => ({ ...obj, b: obj.a + 1 }),
        obj => ({ ...obj, c: obj.b * 2 }),
      );

      it('#01 => Prepare pipe', () => {
        expect(piped({ a: 1 })).toEqual({ a: 1, b: 2, c: 4 });
      });

      it('#01 => one', () => {
        const piped2 = pipe(piped, mapArray('a'));
        expect(piped2({ a: 1 })).toEqual(1);
      });

      it('#07 => Many', () => {
        const piped2 = pipe(piped, mapArray('a', 'b'));
        expect(piped2({ a: 1 })).toEqual([1, 2]);
      });
    });

    it('#03 => Flatten', () => {
      const nestedObject = () => ({
        a: {
          b: {
            c: 1,
          },
          d: 2,
        },
        e: 3,
      });

      const piped = pipe(nestedObject, identity, flatten)();
      expect(piped).toEqual({
        'a.b.c': 1,
        'a.d': 2,
        e: 3,
      });
    });
  });

  it('#04 => should handle up to 21 functions, but with type error', () => {
    const fn = (x: number) => x + 1;

    type Re = TupleOfLength<typeof fn, 21>;
    /**
     * Generates an array of 21 functions
     */
    const array = Array.from({ length: 21 }, () => fn) as Re;

    // @ts-expect-error for test
    const piped = pipe(...array);
    expect(piped(0)).toBe(21);
  });

  describe('#05 => Too much arguments, not typed', () => {
    const fn = (x: number) => x + 1;

    it('#01 => 30 functions', () => {
      const array = Array.from({ length: 30 }, () => fn);
      const piped = pipe.notTyped(...array);
      expect(piped(0)).toBe(30);
    });

    it('#02 => 100 functions', () => {
      const array = Array.from({ length: 100 }, () => fn);
      const piped = pipe.notTyped(...array);
      expect(piped(0)).toBe(100);
    });

    it('#02 => 1000 functions', () => {
      const array = Array.from({ length: 1000 }, () => fn);
      const piped = pipe.notTyped(...array);
      expect(piped(0)).toBe(1000);
    });
  });

  describe('#06 => Multiple args', () => {
    it('#01 => should handle multiple arguments', () => {
      const piped = pipe(
        (a: number, b: number) => a + b,
        (x: number) => x * 2,
      );
      expect(piped(1, 2)).toBe(6);
    });

    it('#02 => should handle multiple arguments with more functions', () => {
      const piped = pipe(
        (a: number, b: number) => a + b,
        x => x * 2,
        x => x - 1,
      );
      expect(piped(1, 2)).toBe(5);
    });

    it('#03 => should handle multiple arguments with more functions and different types', () => {
      const piped = pipe(
        (a: number, b: number) => a + b,
        x => `Result: ${x}`,
        s => s.toUpperCase(),
      );
      expect(piped(1, 2)).toBe('RESULT: 3');
    });

    it('#04 => should handle parameters of different types', () => {
      const piped = pipe(
        (a: number, b: string, c: boolean) => a + b + c,
        x => `Result: ${x}`,
        s => s.toUpperCase(),
      );

      expect(piped(1, 'test', true)).toBe('RESULT: 1TESTTRUE');
    });
  });
});
