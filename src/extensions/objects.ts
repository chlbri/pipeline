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
  Ks extends (keyof T)[],
> = Ks extends [
  infer F1 extends keyof T,
  ...infer Rest extends (keyof T)[],
]
  ? Rest extends []
    ? [T[F1]]
    : [T[F1], ...KeysToValues<T, Rest>]
  : [];

export function mapArray<K extends string>(
  key: K,
): <const T extends Record<K, any>>(value: T) => T[K];

export function mapArray<
  K1 extends string,
  K2 extends string,
  Ks extends string[],
>(
  key1: K1,
  key2: K2,
  ...keys: Ks
): <const T extends Record<K1 | K2 | Ks[number], any>>(
  value: T,
) => [T[K1], T[K2], ...KeysToValues<T, Ks>];

export function mapArray<const T extends object>(...keys: (keyof T)[]) {
  return (value: T) => {
    const len = keys.length;
    if (len === 1) return value[keys[0]];
    return keys.map(key => value[key]);
  };
}

//more examples of getValues
