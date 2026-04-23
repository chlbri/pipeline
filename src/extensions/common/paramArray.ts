import type { Fn } from '../../types';

type IterableToArray<T extends Iterable<any>> =
  T extends Iterable<infer U> ? U[] : never;

export const paramArray = <T extends Iterable<any>, F2>(
  fn: Fn<IterableToArray<T>, F2>,
) => {
  return (value: T): F2 => {
    return (fn as any)(...value);
  };
};
