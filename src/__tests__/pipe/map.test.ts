import { addBy, identity, map, tap } from '../../extensions';
import { pipe } from '../../pipe';

describe('#08 => map', () => {
  describe('#01 => should handle map', () => {
    const piped = pipe(
      addBy(2),
      map(helper => [
        helper({
          cond: value => value === 5,
          fn: v => v + 10,
        }),
        helper({
          cond: value => value === 2,
          fn: v => v * 10,
        }),
      ]),
    );

    it('#01 => 3 => 15', () => {
      expect(piped(3)).toEqual(15);
    });

    it('#02 => 0 => 20', () => {
      expect(piped(0)).toEqual(20);
    });
  });

  describe('#02 => union', () => {
    const log = vi.fn();

    const piped = pipe(
      (x: number | string | boolean) => x,
      map(helper => [
        helper<number>({
          cond: value => typeof value === 'number',
          fn: v => `${v * 2}`,
        }),

        helper<boolean>({
          cond: value => typeof value === 'number',
          fn: identity,
        }),

        helper<string>({
          cond: value => typeof value === 'string',
          fn: v => v.toUpperCase(),
        }),
      ]),
      tap(log),
    );

    it('#01 => 3 => "6"', () => {
      expect(piped(3)).toBe('6');
    });

    it('#02 => "test" => "TEST"', () => {
      expect(piped('test')).toBe('TEST');
    });

    it('#03 => true => true, identity', () => {
      expect(piped(true)).toBe(true);
    });

    describe('#04 => console', () => {
      it('#01 => Called with "6"', () => {
        expect(log).toHaveBeenNthCalledWith(1, '6');
      });

      it('#02 => Called with "TEST"', () => {
        expect(log).toHaveBeenNthCalledWith(2, 'TEST');
      });

      it('#03 => Called with true', () => {
        expect(log).toHaveBeenNthCalledWith(3, true);
      });
    });
  });
});
