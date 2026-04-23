import { createTests } from '@bemedev/dev-utils/vitest-extended';
import {
  compare,
  isNotZero,
  isZero,
  sign,
} from '../extensions/numbers/checkers';

describe('numbers checkers', () => {
  describe('#01 => isZero', () => {
    const { acceptation, success } = createTests(isZero);

    describe('#00 => Acceptation', acceptation);

    describe(
      '#01 => Success',
      success(
        {
          invite: 'should return true for zero',
          parameters: 0,
          expected: true,
        },
        {
          invite: 'should return false for positive numbers',
          parameters: [1, 7],
          expected: false,
        },
        {
          invite: 'should return true if some equals 0',
          parameters: [0, 7],
          expected: true,
        },
        {
          invite: 'should return false for positive numbers',
          parameters: [1, 7],
          expected: false,
        },
        {
          invite: 'should return false for large positive numbers',
          parameters: Number.MAX_SAFE_INTEGER,
          expected: false,
        },
        {
          invite: 'should return false for negative numbers',
          parameters: -1,
          expected: false,
        },
        {
          invite: 'should return false for large negative numbers',
          parameters: Number.MIN_SAFE_INTEGER,
          expected: false,
        },
      ),
    );
  });

  describe('#02 => compare', () => {
    describe('#00 => with toCompare = 5', () => {
      const compareToFive = compare(5);
      const { acceptation, success } = createTests(compareToFive);

      describe('#00 => Acceptation', acceptation);

      describe(
        '#01 => Success',
        success(
          {
            invite: 'should return 0 when value equals toCompare',
            parameters: 5,
            expected: 0,
          },
          {
            invite: 'should return 1 when value is greater than toCompare',
            parameters: 6,
            expected: 1,
          },
          {
            invite:
              'should return 1 when value is much greater than toCompare',
            parameters: Number.MAX_SAFE_INTEGER,
            expected: 1,
          },
          {
            invite: 'should return -1 when value is less than toCompare',
            parameters: 4,
            expected: -1,
          },
          {
            invite:
              'should return -1 when value is much less than toCompare',
            parameters: Number.MIN_SAFE_INTEGER,
            expected: -1,
          },
        ),
      );
    });

    describe('#01 => with toCompare = 0', () => {
      const compareToZero = compare(0);
      const { acceptation, success } = createTests(compareToZero);

      describe('#00 => Acceptation', acceptation);
      describe(
        '#01 => Success',
        success(
          {
            invite: 'should return 0 when value equals 0',
            parameters: [0],
            expected: 0,
          },
          {
            invite: 'should return 1 when value is positive',
            parameters: [1],
            expected: 1,
          },
          {
            invite: 'should return 1 when value is large positive',
            parameters: [100],
            expected: 1,
          },
          {
            invite: 'should return -1 when value is negative',
            parameters: [-1],
            expected: -1,
          },
          {
            invite: 'should return -1 when value is large negative',
            parameters: [-100],
            expected: -1,
          },
        ),
      );
    });

    describe('#02 => with toCompare = negative number', () => {
      const compareToNegativeFive = compare(-5);
      const { acceptation, success } = createTests(compareToNegativeFive);

      describe('#00 => Acceptation', acceptation);
      describe(
        '#01 => Success',
        success(
          {
            invite: 'should return 0 when value equals toCompare',
            parameters: [-5],
            expected: 0,
          },
          {
            invite: 'should return 1 when value is greater than toCompare',
            parameters: [-4],
            expected: 1,
          },
          {
            invite: 'should return 1 when value is positive',
            parameters: [5],
            expected: 1,
          },
          {
            invite: 'should return -1 when value is less than toCompare',
            parameters: [-6],
            expected: -1,
          },
          {
            invite:
              'should return -1 when value is much less than toCompare',
            parameters: [-10],
            expected: -1,
          },
        ),
      );
    });
  });

  describe('#03 => sign', () => {
    const { acceptation, success } = createTests(sign);

    describe('#00 => Acceptation', acceptation);
    describe(
      '#01 => Success',
      success(
        {
          invite: 'should return 0 for zero',
          parameters: 0,
          expected: 0,
        },
        {
          invite: 'should return 1 for positive numbers',
          parameters: 1,
          expected: 1,
        },
        {
          invite: 'should return 1 for large positive numbers',
          parameters: Number.MAX_SAFE_INTEGER,
          expected: 1,
        },
        {
          invite: 'should return 1 for Infinity',
          parameters: Infinity,
          expected: 1,
        },
        {
          invite: 'should return -1 for negative numbers',
          parameters: -1,
          expected: -1,
        },
        {
          invite: 'should return -1 for large negative numbers',
          parameters: Number.MIN_SAFE_INTEGER,
          expected: -1,
        },
        {
          invite: 'should return -1 for -Infinity',
          parameters: -Infinity,
          expected: -1,
        },
      ),
    );
  });

  describe('#04 => isNotZero', () => {
    const { acceptation, success } = createTests(isNotZero);

    describe('#00 => Acceptation', acceptation);

    describe(
      '#01 => Success',
      success(
        {
          invite: 'should return false for zero',
          parameters: 0,
          expected: false,
        },
        {
          invite: 'should return true for positive numbers',
          parameters: 1,
          expected: true,
        },
        {
          invite: 'should return true for large positive numbers',
          parameters: Number.MAX_SAFE_INTEGER,
          expected: true,
        },
        {
          invite: 'should return true for negative numbers',
          parameters: -1,
          expected: true,
        },
        {
          invite: 'should return true for large negative numbers',
          parameters: Number.MIN_SAFE_INTEGER,
          expected: true,
        },
      ),
    );
  });
});
