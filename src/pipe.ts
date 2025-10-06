import type { Fn1, HasPromise, NextFn, PipeReturnType } from './types';

type Args<F extends Fn1> = Parameters<F>[0] extends infer P
  ? undefined extends P
    ? P extends undefined
      ? []
      : [value?: P]
    : [value: P]
  : never;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<F1 extends Fn1, F2 extends NextFn<F1>>(
  f1: F1,
  f2: F2,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2]> extends true
  ? Promise<ReturnType<F2>>
  : ReturnType<F2>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3]> extends true
  ? Promise<ReturnType<F3>>
  : ReturnType<F3>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3, F4]> extends true
  ? Promise<ReturnType<F4>>
  : ReturnType<F4>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3, F4, F5]> extends true
  ? Promise<ReturnType<F5>>
  : ReturnType<F5>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3, F4, F5, F6]> extends true
  ? Promise<ReturnType<F6>>
  : ReturnType<F6>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3, F4, F5, F6, F7]> extends true
  ? Promise<ReturnType<F7>>
  : ReturnType<F7>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3, F4, F5, F6, F7, F8]> extends true
  ? Promise<ReturnType<F8>>
  : ReturnType<F8>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3, F4, F5, F6, F7, F8, F9]> extends true
  ? Promise<ReturnType<F9>>
  : ReturnType<F9>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
): (
  ...args: Args<F1>
) => HasPromise<[F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]> extends true
  ? Promise<ReturnType<F10>>
  : ReturnType<F10>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
): (
  ...args: Args<F1>
) => HasPromise<
  [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11]
> extends true
  ? Promise<ReturnType<F11>>
  : ReturnType<F11>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
): (
  ...args: Args<F1>
) => HasPromise<
  [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12]
> extends true
  ? Promise<ReturnType<F12>>
  : ReturnType<F12>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
): (
  ...args: Args<F1>
) => HasPromise<
  [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13]
> extends true
  ? Promise<ReturnType<F13>>
  : ReturnType<F13>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
  F14 extends NextFn<F13>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
  f14: F14,
): (
  ...args: Args<F1>
) => HasPromise<
  [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14]
> extends true
  ? Promise<ReturnType<F14>>
  : ReturnType<F14>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
  F14 extends NextFn<F13>,
  F15 extends NextFn<F14>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
  f14: F14,
  f15: F15,
): (
  ...args: Args<F1>
) => HasPromise<
  [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15]
> extends true
  ? Promise<ReturnType<F15>>
  : ReturnType<F15>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
  F14 extends NextFn<F13>,
  F15 extends NextFn<F14>,
  F16 extends NextFn<F15>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
  f14: F14,
  f15: F15,
  f16: F16,
): (
  ...args: Args<F1>
) => HasPromise<
  [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16]
> extends true
  ? Promise<ReturnType<F16>>
  : ReturnType<F16>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
  F14 extends NextFn<F13>,
  F15 extends NextFn<F14>,
  F16 extends NextFn<F15>,
  F17 extends NextFn<F16>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
  f14: F14,
  f15: F15,
  f16: F16,
  f17: F17,
): (
  ...args: Args<F1>
) => HasPromise<
  [
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    F10,
    F11,
    F12,
    F13,
    F14,
    F15,
    F16,
    F17,
  ]
> extends true
  ? Promise<ReturnType<F17>>
  : ReturnType<F17>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
  F14 extends NextFn<F13>,
  F15 extends NextFn<F14>,
  F16 extends NextFn<F15>,
  F17 extends NextFn<F16>,
  F18 extends NextFn<F17>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
  f14: F14,
  f15: F15,
  f16: F16,
  f17: F17,
  f18: F18,
): (
  ...args: Args<F1>
) => HasPromise<
  [
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    F10,
    F11,
    F12,
    F13,
    F14,
    F15,
    F16,
    F17,
    F18,
  ]
> extends true
  ? Promise<ReturnType<F18>>
  : ReturnType<F18>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
  F14 extends NextFn<F13>,
  F15 extends NextFn<F14>,
  F16 extends NextFn<F15>,
  F17 extends NextFn<F16>,
  F18 extends NextFn<F17>,
  F19 extends NextFn<F18>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
  f14: F14,
  f15: F15,
  f16: F16,
  f17: F17,
  f18: F18,
  f19: F19,
): (
  ...args: Args<F1>
) => HasPromise<
  [
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    F10,
    F11,
    F12,
    F13,
    F14,
    F15,
    F16,
    F17,
    F18,
    F19,
  ]
> extends true
  ? Promise<ReturnType<F19>>
  : ReturnType<F19>;

/**
 * Creates a function pipeline that applies a series of functions in sequence.
 * @returns A function that takes an argument and applies a series of functions to it in sequence.
 * Each function in the series takes the output of the previous function as its input.
 * The final function's return value is the output of the entire pipeline.
 * @remarks Accepts functions until 20
 */
export function pipe<
  F1 extends Fn1,
  F2 extends NextFn<F1>,
  F3 extends NextFn<F2>,
  F4 extends NextFn<F3>,
  F5 extends NextFn<F4>,
  F6 extends NextFn<F5>,
  F7 extends NextFn<F6>,
  F8 extends NextFn<F7>,
  F9 extends NextFn<F8>,
  F10 extends NextFn<F9>,
  F11 extends NextFn<F10>,
  F12 extends NextFn<F11>,
  F13 extends NextFn<F12>,
  F14 extends NextFn<F13>,
  F15 extends NextFn<F14>,
  F16 extends NextFn<F15>,
  F17 extends NextFn<F16>,
  F18 extends NextFn<F17>,
  F19 extends NextFn<F18>,
  F20 extends NextFn<F19>,
>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9,
  f10: F10,
  f11: F11,
  f12: F12,
  f13: F13,
  f14: F14,
  f15: F15,
  f16: F16,
  f17: F17,
  f18: F18,
  f19: F19,
  f20: F20,
): (
  ...args: Args<F1>
) => HasPromise<
  [
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    F10,
    F11,
    F12,
    F13,
    F14,
    F15,
    F16,
    F17,
    F18,
    F19,
    F20,
  ]
> extends true
  ? Promise<ReturnType<F20>>
  : ReturnType<F20>;

export function pipe<T extends readonly Fn1[]>(...fns: T) {
  return pipe.notTyped(...fns);
}

pipe.notTyped = <T extends readonly Fn1[]>(...fns: T) => {
  // Check if any function is async by testing a sample call
  const hasAsyncFunction = fns.some(fn => {
    return fn.constructor.name === 'AsyncFunction';
  });

  type Out = (...args: Args<T[0]>) => PipeReturnType<T>;

  if (hasAsyncFunction) {
    // Use async implementation
    return (async (...args) => {
      let result: any = args[0];
      for (const fn of fns) {
        result = await fn(result);
      }
      return result;
    }) as Out;
  } else {
    // Use sync implementation for better performance
    return ((...args) => {
      return fns.reduce((acc, fn) => fn(acc), args[0]);
    }) as Out;
  }
};
