import type { Fn1, NoTyped, PipeReturnType } from './types';

expectTypeOf<NoTyped>().toEqualTypeOf<[Fn1, Fn1]>();

// Test PipeReturnType with empty array
expectTypeOf<PipeReturnType<[]>>().toEqualTypeOf<never>();

// Test PipeReturnType with single function
expectTypeOf<
  PipeReturnType<[(x: number) => string]>
>().toEqualTypeOf<string>();

// Test PipeReturnType with multiple synchronous functions
expectTypeOf<
  PipeReturnType<[(x: number) => string, (x: string) => boolean]>
>().toEqualTypeOf<boolean>();

// Test PipeReturnType with multiple synchronous functions (more complex)
expectTypeOf<
  PipeReturnType<
    [(x: number) => string, (x: string) => boolean, (x: boolean) => number]
  >
>().toEqualTypeOf<number>();

// Test PipeReturnType with Promise in first function
expectTypeOf<
  PipeReturnType<[(x: number) => Promise<string>, (x: string) => boolean]>
>().toEqualTypeOf<Promise<boolean>>();

// Test PipeReturnType with Promise in middle function
expectTypeOf<
  PipeReturnType<
    [
      (x: number) => string,
      (x: string) => Promise<boolean>,
      (x: boolean) => number,
    ]
  >
>().toEqualTypeOf<Promise<number>>();

// Test PipeReturnType with Promise in last function
expectTypeOf<
  PipeReturnType<
    [
      (x: number) => string,
      (x: string) => boolean,
      (x: boolean) => Promise<number>,
    ]
  >
>().toEqualTypeOf<Promise<number>>();

// Test PipeReturnType with multiple Promises
expectTypeOf<
  PipeReturnType<
    [(x: number) => Promise<string>, (x: string) => Promise<boolean>]
  >
>().toEqualTypeOf<Promise<boolean>>();

// Test PipeReturnType with all functions returning Promises
expectTypeOf<
  PipeReturnType<
    [
      (x: number) => Promise<string>,
      (x: Date) => Promise<boolean>,
      (x: boolean) => Promise<number>,
    ]
  >
>().toEqualTypeOf<Promise<number>>();

// Test PipeReturnType with single Promise function
expectTypeOf<
  PipeReturnType<[(x: number) => Promise<string>]>
>().toEqualTypeOf<Promise<string>>();
