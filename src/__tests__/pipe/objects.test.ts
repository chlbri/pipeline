import { flatten, identity, mapArray } from '../../extensions';
import { pipe } from '../../pipe';

describe('#03 => should handle objects', () => {
  it('#01 => simple object', () => {
    const piped = pipe(
      (obj: { a: number }) => ({ ...obj, b: obj.a + 1 }),
      obj => ({ ...obj, c: obj.b * 2 }),
    );
    expect(piped({ a: 1 })).toEqual({ a: 1, b: 2, c: 4 });
  });

  describe.concurrent('#02 => Complex MapArray', () => {
    const piped = pipe(
      (obj: { a: number }) => ({ ...obj, b: obj.a + 1 }),
      obj => ({ ...obj, c: obj.b * 2 }),
    );

    it('#01 => Prepare pipe', () => {
      expect(piped({ a: 1 })).toEqual({ a: 1, b: 2, c: 4 });
    });

    it('#02 => one', () => {
      const piped2 = pipe(piped, mapArray('a'));
      expect(piped2({ a: 1 })).toEqual(1);
    });

    it('#03 => Many', () => {
      const piped2 = pipe(piped, mapArray('a', 'b'));
      expect(piped2({ a: 1 })).toEqual([1, 2]);
    });
  });

  it('#03 => Flatten', () => {
    const nestedObject = () => ({
      a: {
        b: {
          c: 1,
        },
        d: 2,
      },
      e: 3,
    });

    const piped = pipe(nestedObject, identity, flatten)();
    expect(piped).toEqual({
      'a.b.c': 1,
      'a.d': 2,
      e: 3,
    });
  });
});
