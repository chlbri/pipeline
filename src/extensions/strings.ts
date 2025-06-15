export const toUpperCase = (value: string) => value.toLocaleUpperCase();

export const toLowerCase = (value: string) => value.toLocaleLowerCase();

export const toString = (value: unknown) => String(value);

export const trim = (value: string) => value.trim();

export const capitalize = (value: string) => {
  return value.charAt(0).toLocaleLowerCase() + value.slice(1);
};

export const escapeRegExp = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

export const replaceAll = (...replacers: string[]) => {
  return (value: string) => {
    let out = value;
    replacers.forEach(
      repl => (out = out.replace(new RegExp(escapeRegExp(repl), 'g'), '')),
    );

    return out;
  };
};
