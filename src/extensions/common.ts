export const identity = <T>(value: T) => value;

export const isValue = <T>(toCompare: T) => {
  return (value: T) => value === toCompare;
};
