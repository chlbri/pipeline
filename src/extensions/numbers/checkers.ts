import { isNotValue, isValue } from '../common';

export const isZero = isValue(0);

export const isNotZero = isNotValue(0);

export const compare = (toCompare: number) => {
  const out = (value: number) => {
    return value === toCompare ? 0 : value > toCompare ? 1 : -1;
  };

  return out;
};

export const sign = compare(0);
