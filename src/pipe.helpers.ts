import { ASYNC_CONSTRUCTOR_NAME } from './constants';
import type { Fn } from './types';

export const isFnPromise = (
  value?: unknown,
): value is Fn<any[], Promise<any>> => {
  return (
    !!value &&
    typeof value === 'function' &&
    value.constructor.name === ASYNC_CONSTRUCTOR_NAME
  );
};

type NotTyped_F = <T extends readonly Fn[]>(
  ...fns: T
) => (...args: Parameters<T[0]>) => any;

export const notTyped: NotTyped_F = (...fns) => {
  // Check if any function is async by testing a sample call
  const hasAsyncFunction = fns.some(isFnPromise);
  const [fn1, ...rest] = fns;

  if (hasAsyncFunction) {
    // Use async implementation
    return async (...args) => {
      let result = await fn1?.(...args);
      for (const fn of rest) result = await fn(result);
      return result;
    };
  } else {
    // Use sync implementation for better performance
    return (...args) => {
      const first = fn1?.(...args);
      return rest.reduce((acc, fn) => fn(acc), first);
    };
  }
};
