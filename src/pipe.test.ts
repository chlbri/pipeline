import { pipe } from './pipe';

describe('pipe', () => {
  it('should handle two functions', () => {
    const fn1 = (x: number) => x + 1;
    const fn2 = (x: number) => x * 2;
    const piped = pipe(fn1, fn2);
    expect(piped(2)).toBe(6); // (2+1)*2
  });

  it('should handle three functions', () => {
    const fn1 = (x: number) => x + 1;
    const fn2 = (x: number) => x * 2;
    const fn3 = (x: number) => x - 3;
    const piped = pipe(fn1, fn2, fn3);
    expect(piped(2)).toBe(3); // ((2+1)*2)-3
  });

  it('should handle four functions', () => {
    const piped = pipe(
      (x: number) => x + 1,
      x => x * 2,
      x => x - 3,
      x => x / 2,
    );
    expect(piped(2)).toBe(1.5); // (((2+1)*2)-3)/2
  });

  it('should handle five functions', () => {
    const piped = pipe(
      (x: number) => x + 1,
      x => x * 2,
      x => x - 3,
      x => x / 2,
      x => x ** 2,
    );
    expect(piped(2)).toBe(2.25); // ((((2+1)*2)-3)/2)^2
  });

  it('should handle ten functions', () => {
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

  it('should handle string transformations', () => {
    const piped = pipe(
      (s: string) => s.trim(),
      s => s.toUpperCase(),
      s => s + '!',
    );
    expect(piped('  hello ')).toBe('HELLO!');
  });

  it('should handle objects', () => {
    const piped = pipe(
      (obj: { a: number }) => ({ ...obj, b: obj.a + 1 }),
      obj => ({ ...obj, c: obj.b * 2 }),
    );
    expect(piped({ a: 1 })).toEqual({ a: 1, b: 2, c: 4 });
  });

  it('should handle up to 20 functions', () => {
    const piped = pipe(
      (x: number) => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
      x => x + 1,
    );
    expect(piped(0)).toBe(20);
  });
});
