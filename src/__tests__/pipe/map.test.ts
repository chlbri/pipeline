import { addBy, identity, monad, tap } from '../../extensions';
import { pipe } from '../../pipe';
import { createTests } from '@bemedev/dev-utils/vitest-extended';

describe('#08 => map', () => {
  describe(
    '#01 => should handle map',
    createTests(
      pipe(
        addBy(2),
        monad(helper => [
          helper(
            value => value === 5,
            v => v + 10,
          ),
          helper(
            value => value === 2,
            v => v * 10,
          ),
        ]),
      ),
    ).success(
      {
        invite: '3 => 15',
        parameters: 3,
        expected: 15,
      },
      {
        invite: '0 => 20',
        parameters: 0,
        expected: 20,
      },
      {
        invite: '12 => 14, no condition matched, return value',
        parameters: 12,
        expected: 14,
      },
    ),
  );

  describe('#02 => union', () => {
    const log = vi.fn();

    describe(
      '#01 => success',
      createTests(
        pipe(
          (x: number | string | boolean) => x,
          monad(helper => [
            helper(
              value => typeof value === 'number',
              v => `${v * 2}`,
            ),

            helper(value => typeof value === 'boolean', identity),

            helper(
              value => typeof value === 'string',
              v => v.toUpperCase(),
            ),
          ]),
          v => v,
          tap(log),
        ),
      ).success(
        {
          invite: '3 => "6"',
          parameters: 3,
          expected: '6',
        },
        {
          invite: '"test" => "TEST"',
          parameters: 'test',
          expected: 'TEST',
        },
        {
          invite: 'true => true, identity',
          parameters: true,
          expected: true,
        },
      ),
    );

    describe('#02 => console', () => {
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
