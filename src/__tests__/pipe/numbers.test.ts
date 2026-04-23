import { createTests } from '@bemedev/dev-utils/vitest-extended';
import { add, times, division, exponent } from '../../extensions';
import { pipe } from '../../pipe';

describe('#01 => Numbers, (test with 2)', () => {
  const { acceptation, success } = createTests(pipe, {
    transform: fn => fn(2),
  });

  describe('#00 => Acceptation', acceptation);
  describe(
    '#01 => Success',
    success(
      {
        invite: '(2+1)*2 = 6',
        parameters: [add(1), times(2)] as any,
        expected: 6,
      },
      {
        invite: '((2+1)*2)-3 = 3',
        parameters: [add(1), times(2), add(-3)] as any,
        expected: 3,
      },
      {
        invite: '(((2+1)*2)-3)/2 = 1.5',
        parameters: [add(1), times(2), add(-3), division(2)] as any,
        expected: 1.5,
      },
      {
        invite: '((((2+1)*2)-3)/2)^2 = 2.25',
        parameters: [
          add(1),
          times(2),
          add(-3),
          division(2),
          exponent(2),
        ] as any,
        expected: 2.25,
      },
      {
        invite: '((((((((2+1)*2)-3)/2)^2)+10)/2)-1)*3/5 = 3.075',
        parameters: [
          add(1),
          times(2),
          add(-3),
          division(2),
          exponent(2),
          add(10),
          division(2),
          add(-1),
          times(3),
          division(5),
        ] as any,
        expected: 3.075,
      },
      {
        invite: 'Add 1 20 times',
        parameters: Array.from({ length: 20 }, () => add(1)) as any,
        expected: 22,
      },
    ),
  );
});
