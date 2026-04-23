import { add, modulo, voidAction } from '../../extensions';
import { pipe } from '../../pipe';

describe('#07 => voidAction', () => {
  it('#01 => should handle voidAction', () => {
    const piped = pipe(
      (...values: number[]) => {
        return values.reduce((acc, curr) => acc + curr);
      },
      voidAction(pipe(x => `Current value : ${x}`, console.log)),
      add(1),
      modulo(8),
      v => `"${v}" is the result`,
    );

    expect(piped(1, 2, 3)).toBe('"7" is the result');
  });
});
