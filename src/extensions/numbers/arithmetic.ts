/**
 *  A utility function to create a binary operation function.
 * @param fn  A function that takes two numbers and returns a number.
 * @returns  A function that takes a number and returns another function that takes a number, applying the original function to both numbers.
 * @example
 *  ```typescript
 * import { operation } from './numbers';
 * const add = operation((a, b) => a + b);
 * const result = add(2)(3); // 5
 * const times = operation((a, b) => a * b);
 * const result2 = times(4)(5); // 20
 * ```typescript
 */
export const operation = (fn: (a: number, b: number) => number) => {
  return (value: number) => (toApply: number) => fn(value, toApply);
};

export const add = operation((a, b) => a + b);

export const times = operation((a, b) => a * b);

export const division = operation((a, b) => a / b);

export const modulo = operation((a, b) => a % b);

export const exponent = operation((a, b) => a ** b);
