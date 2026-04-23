import { pipe } from '../../pipe';
import type { TupleOfLength } from '../../types';

describe('#04 => should handle up to 21 functions, but with type error', () => {
  it('#01 => 21 functions', () => {
    const fn = (x: number) => x + 1;

    type Re = TupleOfLength<typeof fn, 21>;
    /**
     * Generates an array of 21 functions
     */
    const array = Array.from({ length: 21 }, () => fn) as Re;

    const piped = pipe(...array);
    expect(piped(0)).toBe(21);
  });
});
