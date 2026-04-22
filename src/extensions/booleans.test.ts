import { createTests } from '@bemedev/dev-utils/vitest-extended';
import { toogle, toNumber } from './booleans';

describe('#01 => sswitch', () => {
  const { acceptation, success } = createTests(toogle);

  describe('#00 => Acceptation', acceptation);

  describe(
    '#01 => Success',
    success(
      {
        invite: 'should return false when input is true',
        parameters: [true],
        expected: false,
      },
      {
        invite: 'should return true when input is false',
        parameters: [false],
        expected: true,
      },
    ),
  );
});

describe('#02 => toNumber', () => {
  const { acceptation, success } = createTests(toNumber);

  describe('#00 => Acceptation', acceptation);

  describe(
    '#01 => Success',
    success(
      {
        invite: 'should return 1 when input is true',
        parameters: [true],
        expected: 1,
      },
      {
        invite: 'should return 0 when input is false',
        parameters: [false],
        expected: 0,
      },
    ),
  );
});
