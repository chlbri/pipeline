import type { Fn } from '../../types';

export const voidAction = <S>(fn: Fn<[NoInfer<S>]>): Fn<[S], S> => {
  return value => {
    fn(value);
    return value;
  };
};

export const tap = voidAction;
