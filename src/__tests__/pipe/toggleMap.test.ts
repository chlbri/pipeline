import { pipe } from '../../pipe';
import { toggleMap } from '../../extensions';

describe('toggleMap', () => {
  const condition = <T extends number>(x: T) => x > 5;
  const truthy = <T extends number>(x: T) => x * 2;
  const falsy = <T extends number>(x: T) => x + 10;

  describe('#01 => all params are defined', () => {
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

  describe('#02 => falsy is not defined', () => {
    const piped = pipe((x: number) => x, toggleMap(condition, truthy));

    it('#01 => 3 => 3', () => {
      expect(piped(3)).toBe(3);
    });

    it('#02 => 6 => 12', () => {
      expect(piped(6)).toBe(12);
    });
  });

  describe('#03 => condition and falsy are not defined', () => {
    const piped = pipe((x: number) => x, toggleMap({ truthy }));

    it('#01 => 3 => 6', () => {
      expect(piped(3)).toBe(6);
    });

    it('#02 => 6 => 12', () => {
      expect(piped(6)).toBe(12);
    });

    it('#03 => 0 => 0', () => {
      expect(piped(0)).toBe(0);
    });

    it('#04 => 10 => 20', () => {
      expect(piped(10)).toBe(20);
    });

    it('#05 => 1 => 2', () => {
      expect(piped(1)).toBe(2);
    });
  });

  describe('#04 => falsy is not defined (object)', () => {
    const piped = pipe((x: number) => x, toggleMap({ truthy, condition }));

    it('#01 => 3 => 6', () => {
      expect(piped(3)).toBe(3);
    });

    it('#02 => 6 => 12', () => {
      expect(piped(6)).toBe(12);
    });

    it('#03 => 0 => 0', () => {
      expect(piped(0)).toBe(0);
    });

    it('#04 => 10 => 20', () => {
      expect(piped(10)).toBe(20);
    });

    it('#05 => 1 => 1', () => {
      expect(piped(1)).toBe(1);
    });
  });
});
