export const flatten = (ob: any) => {
  const result: any = {};

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
      const temp = flatten(ob[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + '.' + j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = ob[i];
    }
  }
  return result;
};

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
    console.log('value', '=>', value);
    return keys.map(key => (value as any)[key]);
  };
}

//more examples of getValues
