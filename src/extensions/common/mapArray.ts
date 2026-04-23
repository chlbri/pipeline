export type KeysToValues<
  T extends object,
  Ks extends readonly (keyof T)[],
> = Ks extends [
  infer F1 extends keyof T,
  ...infer Rest extends (keyof T)[],
]
  ? Rest extends []
    ? T[F1]
    : [T[F1], ...KeysToValues<T, Rest>]
  : [];

export function mapArray<const K extends string>(
  key: K,
): <const T extends Record<K, any>>(value: T) => T[K];

export function mapArray<
  const K1 extends string,
  const K2 extends string,
  const Ks extends string[],
>(
  key1: K1,
  key2: K2,
  ...keys: Ks
): <const T extends Record<K1 | K2 | Ks[number], any>>(
  value: T,
) => [T[K1], T[K2], ...KeysToValues<T, Ks>];

export function mapArray<T extends readonly string[]>(...keys: T) {
  return (value: Record<T[number], any>) => {
    const len = keys.length;
    if (len === 1) return (value as any)[keys[0]];
    return keys.map(key => (value as any)[key]);
  };
}
