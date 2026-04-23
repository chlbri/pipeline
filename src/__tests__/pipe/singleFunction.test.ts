import { add } from '../../extensions';
import { pipe } from '../../pipe';

describe('#00 => only one fn, ideal to build functions', () => {
  it('#01 => should handle only one function', () => {
    const piped = pipe(add(1));
    expect(piped(1)).toBe(2);
  });

  describe('#02 => should handle only one function with param array arguments', () => {
    const piped = pipe((...args: number[]) =>
      args.reduce((a, b) => a + b, 0),
    );

    it('#01 => args:(1, 2) => 3', () => {
      expect(piped(1, 2)).toBe(3);
    });

    it('#02 => args:(1, 2, 3, 4) => 10', () => {
      expect(piped(1, 2, 3, 4)).toBe(10);
    });

    it('#03 => args:(1, 2, 3, 4, 5) => 15', () => {
      expect(piped(1, 2, 3, 4, 5)).toBe(15);
    });

    it('#04 => args:(1, 2, 3, 4, 5, 6, 7, 8, 9) => 45', () => {
      expect(piped(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
    });

    it('#05 => args:(1 to 100) => 5050', () => {
      const args = Array.from({ length: 100 }, (_, i) => i + 1);
      expect(piped(...args)).toBe(5050);
    });
  });
});
