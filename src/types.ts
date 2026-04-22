export type Fn1 = (...args: any[]) => any;
export type NextFn<T extends Fn1, R = any> = (
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

export type NoTyped = TupleOfLength<Fn1, 2>;

/**
 * Helper type to check if a type is a Promise
 */
type IsPromise<T> = T extends Promise<any> ? true : false;

/**
 * Helper type to check if any function in an array returns a Promise
 */
export type HasPromise<T extends readonly Fn1[]> = T extends readonly [
  infer First extends Fn1,
  ...infer Rest extends readonly Fn1[],
]
  ? IsPromise<ReturnType<First>> extends true
    ? true
    : HasPromise<Rest>
  : false;

/**
 * Helper type to get the return type of the last function in an array
 */
type GetLastReturnType<T extends readonly Fn1[]> = T extends readonly [
  ...any[],
  infer Last extends Fn1,
]
  ? ReturnType<Last>
  : never;

/**
 * Generic type that accepts an array of functions and returns the ReturnType of the last function.
 * If any function returns a Promise, the return type is Promise<Awaited<LastFunctionReturnType>>
 */
export type PipeReturnType<T extends readonly Fn1[]> =
  number extends T['length']
    ? any
    : T extends readonly []
      ? never
      : HasPromise<T> extends true
        ? Promise<Awaited<GetLastReturnType<T>>>
        : GetLastReturnType<T>;
