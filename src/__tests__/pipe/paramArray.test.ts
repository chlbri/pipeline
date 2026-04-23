import { multiplyBy, paramArray } from '../../extensions';
import { pipe } from '../../pipe';

describe('#10 => paramArray', () => {
  const piped = pipe(
    (x: number, y: number, z: number) => [x, y, z],
    paramArray((...nums) => {
      return nums.reduce((acc, curr) => acc * curr, 1);
    }),
    multiplyBy(1.5),
  );

  it('#01 => (1, 2, 3) => 9', () => {
    expect(piped(1, 2, 3)).toBe(9);
  });

  it('#02 => (2, 3, 4) => 36', () => {
    expect(piped(2, 3, 4)).toBe(36);
  });
});
