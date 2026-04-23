import { createTests } from '@bemedev/dev-utils/vitest-extended';
import { addBy, timesBy, divisionBy, exponentBy } from '../../extensions';
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
        parameters: [addBy(1), timesBy(2)] as any,
        expected: 6,
      },
      {
        invite: '((2+1)*2)-3 = 3',
        parameters: [addBy(1), timesBy(2), addBy(-3)] as any,
        expected: 3,
      },
      {
        invite: '(((2+1)*2)-3)/2 = 1.5',
        parameters: [
          addBy(1),
          timesBy(2),
          addBy(-3),
          divisionBy(2),
        ] as any,
        expected: 1.5,
      },
      {
        invite: '((((2+1)*2)-3)/2)^2 = 2.25',
        parameters: [
          addBy(1),
          timesBy(2),
          addBy(-3),
          divisionBy(2),
          exponentBy(2),
        ] as any,
        expected: 2.25,
      },
      {
        invite: '((((((((2+1)*2)-3)/2)^2)+10)/2)-1)*3/5 = 3.075',
        parameters: [
          addBy(1),
          timesBy(2),
          addBy(-3),
          divisionBy(2),
          exponentBy(2),
          addBy(10),
          divisionBy(2),
          addBy(-1),
          timesBy(3),
          divisionBy(5),
        ] as any,
        expected: 3.075,
      },
      {
        invite: 'Add 1 20 timesBy',
        parameters: Array.from({ length: 20 }, () => addBy(1)) as any,
        expected: 22,
      },
    ),
  );
});
