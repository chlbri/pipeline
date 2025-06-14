export type Fn1 = (arg: any) => any;

export type NextFn<T extends Fn1, R = any> = (arg: ReturnType<T>) => R;
