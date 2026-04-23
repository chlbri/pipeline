import { pipe } from '../../pipe';
import { toggleMap } from '../../extensions';

describe('#09 => toggleMap', () => {
  const condition = <T extends number>(x: T) => x > 5;
  const truthy = <T extends number>(x: T) => x * 2;
  const falsy = <T extends number>(x: T) => x + 10;

  describe('#01 => object arg', () => {
    const piped = pipe(
      (x: number) => x,
      toggleMap({ truthy, falsy, condition }),
    );

    it('#01 => 3 => 13', () => {
      expect(piped(3)).toBe(13);
    });

    it('#02 => 6 => 12', () => {
      expect(piped(6)).toBe(12);
    });
  });

  describe('#02 => param args', () => {
    const piped = pipe(
      (x: number) => x,
      toggleMap(condition, truthy, falsy),
    );

    it('#01 => 3 => 13', () => {
      expect(piped(3)).toBe(13);
    });

    it('#02 => 6 => 12', () => {
      expect(piped(6)).toBe(12);
    });
  });
});
