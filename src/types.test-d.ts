import type { Fn1, NoTyped } from './types';

expectTypeOf<NoTyped>().toEqualTypeOf<[Fn1, Fn1]>();
