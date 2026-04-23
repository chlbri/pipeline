export const isValue = <T>(toCompare: T) => {
  return (...values: T[]) => values.some(value => value === toCompare);
};

export const isNotValue = <T>(toCompare: T) => {
  return (...values: T[]) => values.every(value => value !== toCompare);
};
