import {
  add,
  capitalize,
  concat,
  division,
  escapeRegExp,
  exponent,
  flatten,
  identity,
  mapArray,
  replaceAll,
  tap,
  times,
  toUpperCase,
  voidAction,
} from './extensions';

import { pipe } from './pipe';
import type { TupleOfLength } from './types';

// Async versions of arithmetic functions
const addAsync = (n: number) => async (x: number) =>
  Promise.resolve(x + n);
const timesAsync = (n: number) => async (x: number) =>
  Promise.resolve(x * n);
const divisionAsync = (n: number) => async (x: number) =>
  Promise.resolve(x / n);
const exponentAsync = (n: number) => async (x: number) =>
  Promise.resolve(x ** n);

// Async versions of string functions
const trimAsync = async (str: string) => Promise.resolve(str.trim());
const toLowerCaseAsync = async (str: string) =>
  Promise.resolve(str.toLowerCase());
const capitalizeAsync = async (str: string) =>
  Promise.resolve(capitalize(str));

describe('pipe async', () => {
  beforeAll(() => vi.useFakeTimers());

  describe('#01 => Numbers with async functions, (test with 2)', () => {
    it.concurrent('#01 => Mix sync and async: (2+1)*2 = 6', async () => {
      const piped = pipe(add(1), timesAsync(2));
      const result = await piped(2);
      expect(result).toBe(6);
    });

    it.concurrent('#02 => Mix sync and async: ((2+1)*2)-3 = 3', async () => {
      const piped = pipe(addAsync(1), times(2), add(-3));
      const result = await piped(2);
      expect(result).toBe(3);
    });

    it.concurrent('#03 => Mix sync and async: (((2+1)*2)-3)/2 = 1.5', async () => {
      const piped = pipe(add(1), timesAsync(2), add(-3), divisionAsync(2));
      const result = await piped(2);
      expect(result).toBe(1.5);
    });

    describe('#04 => All async: ((((2+1)*2)-3)/2)^2 = 2.25', async () => {
      const log = vi.spyOn(console, 'log');
      const piped = pipe(
        addAsync(1),
        tap(x => console.log(`Intermediate result: ${x}`)),
        timesAsync(2),
        tap(x => console.log(`Intermediate result: ${x}`)),
        addAsync(-3),
        tap(x => console.log(`Intermediate result: ${x}`)),
        divisionAsync(2),
        tap(x => console.log(`Intermediate result: ${x}`)),
        exponentAsync(2),
        voidAction(x => console.log(`Intermediate result: ${x}`)),
      );

      let result: number;
      it('#00 => compute', async () => {
        result = await piped(2);
      });

      it('#01 => should compute the correct result', () => {
        expect(result).toBe(2.25);
      });

      it('#02 => logs the first intermediate result as 3', () => {
        expect(log).toHaveBeenCalledWith('Intermediate result: 3');
      });

      it('#03 => logs the second intermediate result as 6', () => {
        expect(log).toHaveBeenCalledWith('Intermediate result: 6');
      });

      it('#04 => logs the third intermediate result as 3', () => {
        expect(log).toHaveBeenCalledWith('Intermediate result: 3');
      });

      it('#05 => logs the fourth intermediate result as 1.5', () => {
        expect(log).toHaveBeenCalledWith('Intermediate result: 1.5');
      });

      it('#06 => logs the final intermediate result as 2.25', () => {
        expect(log).toHaveBeenCalledWith('Intermediate result: 2.25');
      });
    });

    it.concurrent('#05 => Complex mix: ((((((((2+1)*2)-3)/2)^2)+10)/2)-1)*3/5 = 3.075', async () => {
      const piped = pipe(
        addAsync(1),
        times(2),
        add(-3),
        divisionAsync(2),
        exponent(2),
        addAsync(10),
        division(2),
        add(-1),
        timesAsync(3),
        division(5),
      );
      const result = await piped(2);
      expect(result).toBe(3.075);
    });

    it.concurrent('#06 => Add 1 async 20 times', async () => {
      const asyncAdd1 = addAsync(1);
      const array = Array.from(
        { length: 20 },
        () => asyncAdd1,
      ) as TupleOfLength<typeof asyncAdd1, 20>;
      const piped = pipe(...array);
      const result = await piped(2);
      expect(result).toBe(22);
    });
  });

  it.concurrent('#02 => should handle string transformations with async functions', async () => {
    const piped = pipe(
      trimAsync,
      toUpperCase,
      toLowerCaseAsync,
      capitalizeAsync,
      escapeRegExp,
      concat('!'),
      concat('toRemove', 'toRemove', 'toRemove', 'toRemove', 'toRemove'),
      concat('toRemove2'),
      concat('toRemove2'),
      concat('toRemove3'),
      concat('toRemove3'),
      replaceAll('toRemove', '2', '3'),
    );
    const result = await piped('  hello ');
    expect(result).toBe('Hello!');
  });

  describe('#03 => should handle objects with async functions', () => {
    it.concurrent('#01 => simple object with async', async () => {
      const asyncAdd = async (obj: { a: number }) =>
        Promise.resolve({ ...obj, b: obj.a + 1 });

      const piped = pipe(asyncAdd, obj => ({ ...obj, c: obj.b * 2 }));
      const result = await piped({ a: 1 });
      expect(result).toEqual({ a: 1, b: 2, c: 4 });
    });

    describe.concurrent('#02 => Complex MapArray with async', () => {
      const asyncAddProp = async (obj: { a: number }) =>
        Promise.resolve({ ...obj, b: obj.a + 1 });

      const piped = pipe(asyncAddProp, obj => ({ ...obj, c: obj.b * 2 }));

      it('#01 => Prepare pipe', async () => {
        const result = await piped({ a: 1 });
        expect(result).toEqual({ a: 1, b: 2, c: 4 });
      });

      it('#01 => one', async () => {
        const piped2 = pipe(piped, mapArray('a'));
        const result = await piped2({ a: 1 });
        expect(result).toEqual(1);
      });

      it('#07 => Many', async () => {
        const piped2 = pipe(piped, mapArray('a', 'b'));
        const result = await piped2({ a: 1 });
        expect(result).toEqual([1, 2]);
      });
    });

    it.concurrent('#03 => Flatten with async', async () => {
      const nestedObjectAsync = async () =>
        Promise.resolve({
          a: {
            b: {
              c: 1,
            },
            d: 2,
          },
          e: 3,
        });

      const piped = pipe(nestedObjectAsync, identity, flatten);
      const result = await piped();
      expect(result).toEqual({
        'a.b.c': 1,
        'a.d': 2,
        e: 3,
      });
    });
  });

  it.concurrent('#04 => should handle up to 101 async functions, but with type error', async () => {
    const asyncFn = async (x: number) => Promise.resolve(x + 1);

    type Re = TupleOfLength<typeof asyncFn, 101>;
    /**
     * Generates an array of 101 async functions
     */
    const array = Array.from({ length: 101 }, () => asyncFn) as Re;

    // @ts-expect-error for test
    const piped = pipe(...array);
    const result = await piped(0);
    expect(result).toBe(101);
  });

  describe.concurrent('#05 => Too much arguments, not typed (async)', () => {
    const asyncFn = async (x: number) => Promise.resolve(x + 1);
    const syncFn = (x: number) => x + 1;

    it('#01 => 30 async functions', async () => {
      const array = Array.from({ length: 30 }, () => asyncFn);
      const piped = pipe.notTyped(...array);
      const result = await piped(0);
      expect(result).toBe(30);
    });

    it('#02 => 100 mixed functions (sync and async)', async () => {
      const array = Array.from({ length: 100 }, (_, i) =>
        i % 2 === 0 ? syncFn : asyncFn,
      );
      const piped = pipe.notTyped(...array);
      const result = await piped(0);
      expect(result).toBe(100);
    });

    it('#03 => 1000 mixed functions (mostly sync with some async)', async () => {
      const array = Array.from(
        { length: 1000 },
        (_, i) => (i % 10 === 0 ? asyncFn : syncFn), // Every 10th function is async
      );
      const piped = pipe.notTyped(...array);
      const result = await piped(0);
      expect(result).toBe(1000);
    });

    it('#04 => All sync functions should not return Promise', () => {
      const array = Array.from({ length: 30 }, () => syncFn);
      const piped = pipe.notTyped(...array);
      const result = piped(0);
      expect(result).toBe(30);
      expect(result).not.toBeInstanceOf(Promise);
    });
  });
});
