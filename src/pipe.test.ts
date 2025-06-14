import { pipe } from './pipe';
import type { TupleOfLength } from './types';

describe('pipe', () => {
  it('#01 => should handle two functions', () => {
    const fn1 = (x: number) => x + 1;
    const fn2 = (x: number) => x * 2;
    const piped = pipe(fn1, fn2);
    expect(piped(2)).toBe(6); // (2+1)*2
  });

  it('#02 => should handle three functions', () => {
    const fn1 = (x: number) => x + 1;
    const fn2 = (x: number) => x * 2;
    const fn3 = (x: number) => x - 3;
    const piped = pipe(fn1, fn2, fn3);
    expect(piped(2)).toBe(3); // ((2+1)*2)-3
  });

  it('#03 => should handle four functions', () => {
    const piped = pipe(
      (x: number) => x + 1,
      x => x * 2,
      x => x - 3,
      x => x / 2,
    );
    expect(piped(2)).toBe(1.5); // (((2+1)*2)-3)/2
  });

  it('#04 => should handle five functions', () => {
    const piped = pipe(
      (x: number) => x + 1,
      x => x * 2,
      x => x - 3,
      x => x / 2,
      x => x ** 2,
    );
    expect(piped(2)).toBe(2.25); // ((((2+1)*2)-3)/2)^2
  });

  it('#05 => should handle ten functions', () => {
    const piped = pipe(
      (x: number) => x + 1,
      x => x * 2,
      x => x - 3,
      x => x / 2,
      x => x ** 2,
      x => x + 10,
      x => x / 2,
      x => x - 1,
      x => x * 3,
      x => x / 5,
    );
    // ((((((((2+1)*2)-3)/2)^2)+10)/2)-1)*3/5
    expect(piped(2)).toBe(3.075);
  });

  it('#06 => should handle string transformations', () => {
    const piped = pipe(
      (s: string) => s.trim(),
      s => s.toUpperCase(),
      s => s + '!',
    );
    expect(piped('  hello ')).toBe('HELLO!');
  });

  it('#07 => should handle objects', () => {
    const piped = pipe(
      (obj: { a: number }) => ({ ...obj, b: obj.a + 1 }),
      obj => ({ ...obj, c: obj.b * 2 }),
    );
    expect(piped({ a: 1 })).toEqual({ a: 1, b: 2, c: 4 });
  });

  it('#08 => should handle up to 20 functions', () => {
    const fn = (x: number) => x + 1;

    type Re = TupleOfLength<typeof fn, 20>;
    /**
     * Generates an array of 20 functions
     */
    const array = Array.from({ length: 20 }, () => fn) as Re;

    const piped = pipe(...array);
    expect(piped(0)).toBe(20);
  });

  it('#09 => should handle up to 21 functions, but with type error', () => {
    const fn = (x: number) => x + 1;

    type Re = TupleOfLength<typeof fn, 21>;
    /**
     * Generates an array of 20 functions
     */
    const array = Array.from({ length: 21 }, () => fn) as Re;

    // @ts-expect-error for test
    const piped = pipe(...array);
    expect(piped(0)).toBe(21);
  });

  describe('#10 => Too much arguments, not typed', () => {
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
});
