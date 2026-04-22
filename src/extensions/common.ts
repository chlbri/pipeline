import type { Fn } from '../types';

export const identity = <T>(value: T) => value;

export const isValue = <T>(toCompare: T) => {
  return (...values: T[]) => values.some(value => value === toCompare);
};

export const isNotValue = <T>(toCompare: T) => {
  return (...values: T[]) => values.every(value => value !== toCompare);
};

export const voidAction = <S>(fn: Fn<[NoInfer<S>]>): Fn<[S], S> => {
  return value => {
    fn(value);
    return value;
  };
};

export const tap = voidAction;
