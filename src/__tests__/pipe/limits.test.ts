import { addBy } from '../../extensions';
import { pipe } from '../../pipe';
import type { TupleOfLength } from '../../types';

describe('#05 => Limits of functions typing (100)', () => {
  const fn = addBy(1);
  type TT<N extends number> = TupleOfLength<typeof fn, N>;
  const buildArray = <T extends number>(length: T) => {
    return Array.from({ length }, () => fn) as TT<T>;
  };

  it('#01 => 30 functions', () => {
    const array = buildArray(30);
    const piped = pipe(...array);
    expect(piped(0)).toBe(30);
  });

  it('#02 => 70 functions', () => {
    const array = buildArray(70);
    const piped = pipe(...array);
    expect(piped(0)).toBe(70);
  });

  it('#03 => 100 functions, just the limit (100), typings safely', () => {
    const array = buildArray(100);
    const piped = pipe(...array);
    expect(piped(0)).toBe(100);
  });

  it('#04 => 101 functions, with type errors, (reach limit of "100")', () => {
    const array = buildArray(101);
    // @ts-expect-error too much arguments
    const piped = pipe(...array);
    expect(piped(0)).toBe(101);
  });

  it('#05 => 1000 functions, with notTyped', () => {
    const array = Array.from({ length: 1000 }, () => fn);
    const piped = pipe.notTyped(...array);
    expect(piped(0)).toBe(1000);
  });
});
