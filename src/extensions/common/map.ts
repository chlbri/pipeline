import type { Fn } from '../../types';

type Branch<T = any, R extends T = T> = {
  cond: Fn<[T], boolean>;
  fn: R extends boolean
    ? Fn<[boolean], T>
    : R extends any
      ? Fn<[R], T>
      : never;
};

type Branch2<T = any> = <R extends T = T>(
  branch: Branch<T, R>,
) => Branch<T, R>;

const branch2: Branch2 = branch => branch;
type Branch3<T> = <U extends Branch2<T>>(branch: U) => Branch<T>[];

export const map = <T>(helper: Branch3<T>) => {
  const branches = helper(branch2);

  return (value: T): T => {
    for (const { cond, fn } of branches) {
      if (cond(value)) return fn(value as any);
    }

    return value;
  };
};

export type _ToggleMap_F = <T>(params: {
  condition: Fn<[T], boolean>;
  truthy: Fn<[T], T>;
  falsy: Fn<[T], T>;
}) => Fn<[T], T>;

const _toggleMap: _ToggleMap_F = ({ condition, truthy, falsy }) => {
  return value => {
    if (condition(value)) return truthy(value);
    return falsy(value);
  };
};

export function toggleMap<T>(params: {
  condition: Fn<[T], boolean>;
  truthy: Fn<[T], T>;
  falsy: Fn<[T], T>;
}): Fn<[T], T>;
export function toggleMap<T>(
  condition: Fn<[T], boolean>,
  truthy: Fn<[T], T>,
  falsy: Fn<[T], T>,
): Fn<[T], T>;

export function toggleMap<T>(
  _condition: any,
  _truthy?: Fn<[T], T>,
  _falsy?: Fn<[T], T>,
) {
  const check1 = typeof _condition === 'function';
  if (check1) {
    return _toggleMap({
      condition: _condition,
      truthy: _truthy!,
      falsy: _falsy!,
    });
  }
  const { condition, truthy, falsy } = _condition;
  return _toggleMap({
    condition,
    truthy,
    falsy,
  });
}
