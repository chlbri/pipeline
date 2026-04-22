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
