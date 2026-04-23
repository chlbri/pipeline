import { THIS1 } from '@bemedev/dev-utils/build-tests';
import { createTests } from '@bemedev/dev-utils/vitest-extended';
import { addBy, divisionBy, exponentBy, timesBy } from '../../extensions';

describe('All imports', () => {
  describe('#01 => pipe exists at paths', () => {
    const { acceptation, success } = createTests.withImplementation(
      undefined as any,
      {
        name: 'pipe',
        instanciation: async () => {
          return import(`${THIS1}`).then(m => m.pipe);
        },
        transform: async (pipe: any) => await pipe(2),
      },
    );

    describe('#00 => Acceptation', acceptation);

    describe(
      '#01 => Sync',
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

    const addAsync = (n: number) => async (x: number) =>
      Promise.resolve(x + n);

    describe(
      '#01 => Async',
      success(
        {
          invite: '(2+1)*2 = 6',
          parameters: [addAsync(1), timesBy(2)] as any,
          expected: 6,
        },
        {
          invite: '((2+1)*2)-3 = 3',
          parameters: [addAsync(1), timesBy(2), addAsync(-3)] as any,
          expected: 3,
        },
        {
          invite: '(((2+1)*2)-3)/2 = 1.5',
          parameters: [
            addAsync(1),
            timesBy(2),
            addAsync(-3),
            divisionBy(2),
          ] as any,
          expected: 1.5,
        },
        {
          invite: '((((2+1)*2)-3)/2)^2 = 2.25',
          parameters: [
            addAsync(1),
            timesBy(2),
            addAsync(-3),
            divisionBy(2),
            exponentBy(2),
          ] as any,
          expected: 2.25,
        },
        {
          invite: '((((((((2+1)*2)-3)/2)^2)+10)/2)-1)*3/5 = 3.075',
          parameters: [
            addAsync(1),
            timesBy(2),
            addAsync(-3),
            divisionBy(2),
            exponentBy(2),
            addAsync(10),
            divisionBy(2),
            addAsync(-1),
            timesBy(3),
            divisionBy(5),
          ] as any,
          expected: 3.075,
        },
        {
          invite: 'AddAsync 1 (20 timesBy)',
          parameters: Array.from({ length: 20 }, () => addAsync(1)) as any,
          expected: 22,
        },
        {
          invite: 'AddAsync 1 (1000 timesBy)',
          parameters: Array.from({ length: 1000 }, () =>
            addAsync(1),
          ) as any,
          expected: 1002,
        },
      ),
    );
  });
});
