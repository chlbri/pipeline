export type Fn1 = (arg: any) => any;
export type NextFn<T extends Fn1, R = any> = (arg: ReturnType<T>) => R;

export type TupleOfLength<
  T,
  N extends number = number,
  R extends T[] = [],
> = R['length'] extends N ? R : TupleOfLength<T, N, [...R, T]>;

export type NoTyped = TupleOfLength<Fn1, 2>;
