import type { Fn } from '../../types';

type Fn2<T, R extends T> = (arg: T) => arg is R;

type Branch<T = any, R extends T = T, R2 = any> = {
  cond: Fn2<T, R>;
  fn: R extends boolean
    ? Fn<[boolean], R2>
    : R extends any
      ? Fn<[R], R2>
      : never;
};

type BranchF<T = any> = <const R extends T = T, R2 = any>(
  cond: Fn2<T, R>,
  fn: Fn<[NoInfer<R>], R2>,
) => Branch<T, T, R2>;

export const monad = <T, const U extends Branch<T>[]>(
  helper: (branch: BranchF<T>) => U,
) => {
  type TT = ReturnType<U[number]['fn']>;
  const fns = helper((cond, fn: any) => ({ cond, fn }));
  return (value: T): TT => {
    for (const { cond, fn } of fns) {
      if (cond(value)) return fn(value as any);
    }

    return value as any;
  };
};

export type _ToggleMap_F = <T>(params: {
  condition?: Fn<[T], boolean>;
  truthy: Fn<[T], T>;
  falsy?: Fn<[T], T>;
}) => Fn<[T], T>;

type ConditionObject<T> =
  | {
      truthy: Fn<[T], T>;
      falsy?: never;
      condition?: never;
    }
  | {
      condition: Fn<[T], boolean>;
      truthy: Fn<[T], T>;
      falsy?: Fn<[T], T>;
    };

type Condition<T> = ConditionObject<T> | Fn<[T], boolean>;

const _toggleMap: _ToggleMap_F = ({ condition, truthy, falsy }) => {
  return value => {
    if (!condition) return truthy(value);
    if (condition(value)) return truthy(value);
    return falsy ? falsy(value) : value;
  };
};

export function toggleMonad<T>(params: ConditionObject<T>): Fn<[T], T>;
export function toggleMonad<T>(
  condition: Fn<[T], boolean>,
  truthy: Fn<[T], T>,
  falsy?: Fn<[T], T>,
): Fn<[T], T>;

export function toggleMonad<T>(
  _condition: Condition<T>,
  _truthy?: Fn<[T], T>,
  _falsy?: Fn<[T], T>,
) {
  const __condition = _condition;
  const check1 = typeof __condition === 'function';

  if (check1) {
    return _toggleMap({
      condition: __condition,
      truthy: _truthy!,
      falsy: _falsy,
    });
  }
  const { condition, truthy, falsy } = __condition;
  return _toggleMap({
    condition,
    truthy,
    falsy,
  });
}
