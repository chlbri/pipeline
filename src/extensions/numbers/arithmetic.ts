type FnN = (a: number, b: number) => number;

/**
 *  A utility function to create a binary operation function.
 * @param fn  A function that takes two numbers and returns a number.
 * @returns  A function that takes a number and returns another function that takes a number, applying the original function to both numbers.
 * @example
 *  ```typescript
 * import { operation } from './numbers';
 * const addBy = operation((a, b) => a + b);
 * const result = addBy(2)(3); // 5
 * const timesBy = operation((a, b) => a * b);
 * const result2 = timesBy(4)(5); // 20
 * ```typescript
 */
export const operation = (fn: FnN) => {
  return (toApply: number) => (value: number) => fn(value, toApply);
};

export const addBy = operation((a, b) => a + b);
export const timesBy = operation((a, b) => a * b);
export const divisionBy = operation((a, b) => a / b);
export const multiplyBy = operation((a, b) => a * b);
export const moduloBy = operation((a, b) => a % b);
export const exponentBy = operation((a, b) => a ** b);
