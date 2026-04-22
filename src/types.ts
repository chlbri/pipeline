export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;
export type NextFn<T extends Fn, R = any> = (
  arg: Awaited<ReturnType<T>>,
) => R;

export type Equals<X, Y> = X extends Y
  ? Y extends X
    ? true
    : false
  : false;

export type TupleOfLength<
  T,
  N extends number = number,
  R extends T[] = [],
> = R['length'] extends N ? R : TupleOfLength<T, N, [...R, T]>;

export type NoTyped = TupleOfLength<Fn, 2>;

/**
 * Helper type to check if a type is a Promise
 */
type IsPromise<T> = T extends Promise<any> ? true : false;

export type IsPromiseArray<T extends readonly any[]> = T extends readonly [
  infer First,
  ...infer Rest,
]
  ? IsPromise<First> extends true
    ? true
    : IsPromiseArray<Rest>
  : false;

type _Last<T extends readonly any[]> = T extends [...any[], infer Last]
  ? Last
  : never;

export type MaybePromise<T extends readonly any[], Last = _Last<T>> =
  IsPromiseArray<T> extends true ? Promise<Last> : Last;

export type MaybePromiseFn<
  Args extends any[] = any[],
  R extends any[] = any[],
> = (...args: Args) => MaybePromise<R>;
