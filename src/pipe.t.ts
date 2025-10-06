import { pipe } from './pipe';

const asyncAddProp = async (obj: { a: number }) =>
  Promise.resolve({ ...obj, b: obj.a + 1 });

const piped = pipe(asyncAddProp, obj => ({ ...obj, c: obj.b * 2 }));

piped({ a: 1 }).then(result => {
  console.log(result);
  // Expected output: { a: 1, b: 2, c: 4 }
});
