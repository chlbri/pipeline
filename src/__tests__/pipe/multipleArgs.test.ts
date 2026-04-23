import { pipe } from '../../pipe';

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

    const actual = piped(1, 'test', true);
    expect(actual).toBe('RESULT: 1TESTTRUE');
  });
});
