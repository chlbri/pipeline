# @bemedev/pipe

**N.B :** Open all links in a new tab to avoid losing your place in the
documentation.

<br/>

An elegant library for composing functions in TypeScript. Simplify your
code by creating typed, performant, and fully inferred processing pipelines
— with native async support.

<br/>

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Main API](#main-api)
   - [pipe](#pipe)
   - [pipe.notTyped](#pipenottyped)
4. [Utility Types](#utility-types)
5. [Runtime Utilities](#runtime-utilities)
6. [Common Extensions](#common-extensions)
   - [identity](#identity)
   - [isValue](#isvalue)
   - [isNotValue](#isnotvalue)
   - [voidAction / tap](#voidaction--tap)
   - [flatten](#flatten)
   - [mapArray](#maparray)
   - [map](#map)
   - [toggleMap](#togglemap)
7. [String Extensions](#string-extensions)
8. [Boolean Extensions](#boolean-extensions)
9. [Arithmetic Extensions](#arithmetic-extensions)
10. [Numeric Extensions — Checkers](#numeric-extensions--checkers)
11. [CHANGELOG](#changelog)

<br/>

## Installation

### pnpm

```bash
pnpm install @bemedev/pipe
```

### npm

```bash
npm install @bemedev/pipe
```

### bun

```bash
bun addBy @bemedev/pipe
```

<br/>

## Quick Start

```typescript
import { pipe } from '@bemedev/pipe';

const add1 = (x: number) => x + 1;
const double = (x: number) => x * 2;

const piped = pipe(add1, double);
piped(2); // 6  ← (2 + 1) * 2

const processData = pipe(
  (x: number) => x + 1,
  x => x * 2,
  x => x - 3,
  x => x / 2,
  x => x ** 2,
);
processData(2); // 2.25  ← ((((2+1)*2)-3)/2)²
```

<br/>

## Main API

### `pipe`

```typescript
import { pipe } from '@bemedev/pipe';
```

Creates a pipeline of functions where each function receives the result of
the previous one. Typing is fully inferred, up to **100 functions**.

- Only the **first** function can receive multiple arguments.
- Following functions receive exactly **one** argument.
- If at least one function is `async`, the entire pipeline becomes
  **asynchronous** and returns a `Promise`.

#### Synchronous Pipeline

```typescript
import { pipe } from '@bemedev/pipe';

const formatTitle = pipe(
  (s: string) => s.trim(),
  s => s.toLowerCase(),
  s => s.replace(/\b\w/g, c => c.toUpperCase()),
  s => `📌 ${s}`,
);

formatTitle('  hello world  '); // '📌 Hello World'
```

#### Multi-Argument Pipeline (first step only)

```typescript
import { pipe } from '@bemedev/pipe';

const hypotenuse = pipe(
  (a: number, b: number) => a ** 2 + b ** 2,
  Math.sqrt,
);

hypotenuse(3, 4); // 5
```

#### Asynchronous Pipeline

As soon as an `async` function is present, the final result is a `Promise`.
Following synchronous functions automatically receive the resolved value
(`Awaited`).

```typescript
import { pipe } from '@bemedev/pipe';

const fetchUser = pipe(
  async (id: number) => ({ id, name: 'Alice' }),
  user => ({ ...user, greeting: `Hello, ${user.name}!` }),
);

const result = await fetchUser(1);
// { id: 1, name: 'Alice', greeting: 'Hello, Alice!' }
```

#### Object Pipeline

```typescript
import { pipe } from '@bemedev/pipe';

const enrichUser = pipe(
  (user: { name: string; age: number }) => user,
  u => ({ ...u, isAdult: u.age >= 18 }),
  u => ({ ...u, label: `${u.name} (${u.age})` }),
);

enrichUser({ name: 'Bob', age: 25 });
// { name: 'Bob', age: 25, isAdult: true, label: 'Bob (25)' }
```

---

### `pipe.notTyped`

```typescript
import { pipe } from '@bemedev/pipe';
```

Untyped version of `pipe`. Allows chaining an **unlimited** number of
functions without generic typing constraints. Useful when the number of
functions exceeds 100 or in dynamic cases.

```typescript
import { pipe } from '@bemedev/pipe';

// Chain of 100 increments
const increment100 = pipe.notTyped(
  ...Array.from({ length: 100 }, () => (x: number) => x + 1),
);

increment100(0); // 100
```

```typescript
import { pipe } from '@bemedev/pipe';

// Dynamic pipeline construction
const steps: Array<(x: string) => string> = [
  s => s.trim(),
  s => s.toUpperCase(),
  s => `[${s}]`,
];

const format = pipe.notTyped(...steps);
format('  hello '); // '[HELLO]'
```

<br/>

## Utility Types

Exported from `@bemedev/pipe`.

### `Fn<Args, R>`

Base type for any function.

```typescript
import type { Fn } from '@bemedev/pipe';

type Double = Fn<[number], number>;
// equivalent to: (x: number) => number

const double: Double = x => x * 2;
const result = pipe(double)(5); // 10
```

---

### `NextFn<T>`

Type of a function that takes as argument the **resolved return type**
(`Awaited<ReturnType<T>>`) of another function.

```typescript
import type { Fn, NextFn } from '@bemedev/pipe';

type Step1 = Fn<[number], Promise<string>>;
type Step2 = NextFn<Step1>; // (arg: string) => any
```

---

### `TupleOfLength<T, N>`

Constructs a tuple of exact length `N` where each element is of type `T`.

```typescript
import type { TupleOfLength } from '@bemedev/pipe';

type Three = TupleOfLength<number, 3>; // [number, number, number]
```

---

### `MaybePromise<T>`

Returns `Promise<Last>` if at least one element of tuple `T` is a
`Promise`, otherwise returns `Last` directly.

```typescript
import type { MaybePromise } from '@bemedev/pipe';

type Sync = MaybePromise<[number, string]>; // string
type Async = MaybePromise<[Promise<number>, string]>; // Promise<string>
```

---

### `MaybePromiseFn<Args, R>`

Type of a resulting pipeline function: synchronous or asynchronous based on
the content of `R`.

```typescript
import type { MaybePromiseFn } from '@bemedev/pipe';

type SyncPipe = MaybePromiseFn<[number], [number, string]>;
// (...args: [number]) => string

type AsyncPipe = MaybePromiseFn<[number], [Promise<number>, string]>;
// (...args: [number]) => Promise<string>
```

<br/>

## Runtime Utilities

Exported from `@bemedev/pipe`.

### `isFnPromise`

```typescript
isFnPromise(value?: unknown): value is Fn<any[], Promise<any>>
```

Predicate returning `true` if `value` is an **async function** (whose
`constructor.name` is `"AsyncFunction"`). Used internally by `pipe` to
decide between sync or async execution.

```typescript
import { pipe, isFnPromise } from '@bemedev/pipe';

const checkAsync = pipe((fn: (...args: any[]) => any) => fn, isFnPromise);

checkAsync(async () => 42); // true
checkAsync(() => 42); // false
```

---

### `ASYNC_CONSTRUCTOR_NAME`

```typescript
const ASYNC_CONSTRUCTOR_NAME = 'AsyncFunction';
```

Constant used by `isFnPromise` to identify async functions. Exported to
allow consistent custom checks.

```typescript
import { pipe, ASYNC_CONSTRUCTOR_NAME } from '@bemedev/pipe';

const getConstructorName = pipe(
  (fn: Function) => fn,
  fn => fn.constructor.name,
);

getConstructorName(async () => {}); // 'AsyncFunction' === ASYNC_CONSTRUCTOR_NAME
getConstructorName(() => {}); // 'Function'
```

<br/>

## Common Extensions

```typescript
import { ... } from '@bemedev/pipe/extensions/common';
// or via the barrel:
import { ... } from '@bemedev/pipe/extensions';
```

---

### `identity`

```typescript
identity<T>(value: T): T
```

Returns the received value unchanged. Useful as a neutral step, type
marker, or default value in a pipeline.

```typescript
import { pipe } from '@bemedev/pipe';
import { identity } from '@bemedev/pipe/extensions/common';

const safeNumber = pipe((x: number | null) => x ?? 0, identity);

safeNumber(42); // 42
safeNumber(null); // 0
```

---

### `isValue`

```typescript
isValue<T>(toCompare: T): (...values: T[]) => boolean
```

Returns a variadic predicate that checks if **at least one** of the passed
values is strictly equal to `toCompare`. In a pipeline, receives a single
value from the previous step.

```typescript
import { pipe } from '@bemedev/pipe';
import { isValue } from '@bemedev/pipe/extensions/common';

const isAdmin = pipe(
  (user: { role: string }) => user.role,
  isValue('admin'),
);

isAdmin({ role: 'admin' }); // true
isAdmin({ role: 'user' }); // false
```

```typescript
import { pipe } from '@bemedev/pipe';
import { isValue } from '@bemedev/pipe/extensions/common';

// Used with numeric values
const isZeroCustom = pipe((x: number) => x, isValue(0));

isZeroCustom(0); // true
isZeroCustom(42); // false
```

---

### `isNotValue`

```typescript
isNotValue<T>(toCompare: T): (...values: T[]) => boolean
```

Returns a variadic predicate that checks if **all** passed values are
strictly different from `toCompare`. Opposite of `isValue`.

```typescript
import { pipe } from '@bemedev/pipe';
import { isNotValue } from '@bemedev/pipe/extensions/common';

const isNotGuest = pipe(
  (user: { role: string }) => user.role,
  isNotValue('guest'),
);

isNotGuest({ role: 'admin' }); // true
isNotGuest({ role: 'guest' }); // false
```

```typescript
import { pipe } from '@bemedev/pipe';
import { isNotValue } from '@bemedev/pipe/extensions/common';

const isNonZero = pipe((n: number) => n, isNotValue(0));

isNonZero(5); // true
isNonZero(0); // false
```

---

### `voidAction` / `tap`

```typescript
voidAction<S>(fn: (value: S) => void): (value: S) => S
tap<S>(fn: (value: S) => void): (value: S) => S
```

Executes `fn` as a **side effect** (logging, external mutation, debugging…)
and propagates the original value **unchanged**. `tap` is a strict alias of
`voidAction`.

```typescript
import { pipe } from '@bemedev/pipe';
import { tap } from '@bemedev/pipe/extensions/common';

const processOrder = pipe(
  (order: { id: number; total: number }) => order,
  tap(o => console.log(`[order] received #${o.id}`)),
  o => ({ ...o, total: o.total * 1.2 }),
  tap(o => console.log(`[order] total with VAT: ${o.total}`)),
);

processOrder({ id: 42, total: 100 });
// logs: [order] received #42
// logs: [order] total with VAT: 120
// returns: { id: 42, total: 120 }
```

```typescript
import { pipe } from '@bemedev/pipe';
import { voidAction } from '@bemedev/pipe/extensions/common';

// Database persistence (side effect)
const saveAndReturn = pipe(
  (user: { name: string }) => user,
  voidAction(user => db.save(user)), // always returns user
  user => ({ ...user, saved: true }),
);
```

---

### `flatten`

```typescript
flatten<T>(ob: T): Record<string, unknown>
```

Aplatit récursivement un objet imbriqué en un objet à un seul niveau, avec
des clés en **notation pointée** (`"a.b.c"`). Les tableaux ne sont pas
aplatis.

```typescript
import { pipe } from '@bemedev/pipe';
import { flatten } from '@bemedev/pipe/extensions/common';

const normalise = pipe(
  (obj: { address: { city: string; zip: string }; name: string }) => obj,
  flatten,
);

normalise({ address: { city: 'Paris', zip: '75001' }, name: 'Alice' });
// { 'address.city': 'Paris', 'address.zip': '75001', name: 'Alice' }
```

```typescript
import { pipe } from '@bemedev/pipe';
import { flatten } from '@bemedev/pipe/extensions/common';

// Useful for comparing or serializing deep structures
const deepEqual = pipe(
  (pair: [object, object]) => pair,
  ([a, b]) => [flatten(a), flatten(b)] as const,
  ([fa, fb]) => JSON.stringify(fa) === JSON.stringify(fb),
);

deepEqual([{ a: { b: 1 } }, { a: { b: 1 } }]); // true
deepEqual([{ a: { b: 1 } }, { a: { b: 2 } }]); // false
```

---

### `mapArray`

```typescript
// Signature with 1 key → returns value directly
mapArray<K>(key: K): (obj: Record<K, T>) => T

// Signature with N keys → returns tuple
mapArray<K1, K2, ...Ks>(k1, k2, ...ks): (obj) => [T1, T2, ...]
```

Extracts one or more properties from an object. With **a single key**,
returns the value directly. With **multiple keys**, returns a tuple in the
same order.

```typescript
import { pipe } from '@bemedev/pipe';
import { mapArray } from '@bemedev/pipe/extensions/common';

// Extract a single property
const getName = pipe(
  (user: { name: string; age: number; role: string }) => user,
  mapArray('name'),
);

getName({ name: 'Alice', age: 30, role: 'admin' }); // 'Alice'
```

```typescript
import { pipe } from '@bemedev/pipe';
import { mapArray } from '@bemedev/pipe/extensions/common';

// Extract multiple properties → typed tuple
const getCredentials = pipe(
  (user: { name: string; age: number; token: string }) => user,
  mapArray('name', 'token'),
);

getCredentials({ name: 'Bob', age: 25, token: 'abc123' });
// ['Bob', 'abc123']
```

```typescript
import { pipe } from '@bemedev/pipe';
import { mapArray } from '@bemedev/pipe/extensions/common';

// Chaining after flatten
const getCityAndZip = pipe(
  (user: { address: { city: string; zip: string } }) => user.address,
  mapArray('city', 'zip'),
);

getCityAndZip({ address: { city: 'Lyon', zip: '69001' } });
// ['Lyon', '69001']
```

---

### `map`

```typescript
map<T>(
  helper: (branch: Branch2<T>) => Branch<T>[]
): (value: T) => T
```

Applies the **first branch whose condition is met** and returns its
transformation. If no branch matches, the value is returned unchanged.
Enables expressive pattern-matching inside a pipeline.

Each branch is an object `{ cond, fn }` :

- `cond: (value: T) => boolean` — trigger condition
- `fn: (value: subtype) => T` — transformation

```typescript
import { pipe } from '@bemedev/pipe';
import { map } from '@bemedev/pipe/extensions/common';

// Clamp a value between 0 and 100
const clamp = pipe(
  (x: number) => x,
  map(branch => [
    branch({ cond: x => x < 0, fn: () => 0 }),
    branch({ cond: x => x > 100, fn: () => 100 }),
  ]),
);

clamp(-5); // 0
clamp(50); // 50
clamp(120); // 100
```

```typescript
import { pipe } from '@bemedev/pipe';
import { map } from '@bemedev/pipe/extensions/common';

// Normalize HTTP status to label
const statusLabel = pipe(
  (code: number) => code,
  map(branch => [
    branch({ cond: c => c >= 500, fn: () => 'Erreur serveur' }),
    branch({ cond: c => c >= 400, fn: () => 'Erreur client' }),
    branch({ cond: c => c >= 300, fn: () => 'Redirection' }),
    branch({ cond: c => c >= 200, fn: () => 'Succès' }),
  ]),
);

statusLabel(200); // 'Succès'
statusLabel(404); // 'Erreur client'
statusLabel(503); // 'Erreur serveur'
statusLabel(100); // 100  ← no branch matched → value unchanged
```

```typescript
import { pipe } from '@bemedev/pipe';
import { map } from '@bemedev/pipe/extensions/common';

// Type discrimination in a union pipeline
const describe = pipe(
  (x: number | string | boolean) => x,
  map(branch => [
    branch<number>({
      cond: x => typeof x === 'number',
      fn: x => `nombre: ${x}`,
    }),
    branch<string>({
      cond: x => typeof x === 'string',
      fn: x => `chaîne: "${x}"`,
    }),
    branch<boolean>({
      cond: x => typeof x === 'boolean',
      fn: x => `booléen: ${x}`,
    }),
  ]),
);

describe(42); // 'nombre: 42'
describe('hello'); // 'chaîne: "hello"'
describe(true); // 'booléen: true'
```

---

### `toggleMap`

```typescript
// Positional form
toggleMap<T>(
  condition: (value: T) => boolean,
  truthy: (value: T) => T,
  falsy?:  (value: T) => T,
): (value: T) => T

// Object form
toggleMap<T>({
  condition?: (value: T) => boolean,
  truthy: (value: T) => T,
  falsy?:  (value: T) => T,
}): (value: T) => T
```

Applies `truthy` if condition is met, `falsy` otherwise. If `falsy` is
omitted, the input value is returned as-is. In object form, `condition` is
also optional: if absent, `truthy` is always applied.

```typescript
import { pipe } from '@bemedev/pipe';
import { toggleMap } from '@bemedev/pipe/extensions/common';

// Absolute value (positional form)
const abs = pipe(
  (x: number) => x,
  toggleMap(
    x => x < 0,
    x => -x,
    x => x,
  ),
);

abs(-7); // 7
abs(3); // 3
```

```typescript
import { pipe } from '@bemedev/pipe';
import { toggleMap } from '@bemedev/pipe/extensions/common';

// Normalize a score (object form)
const normaliseScore = pipe(
  (score: number) => score,
  toggleMap({
    condition: s => s > 20,
    truthy: () => 20,
    falsy: s => s,
  }),
);

normaliseScore(25); // 20
normaliseScore(17); // 17
```

<br/>

## String Extensions

```typescript
import { ... } from '@bemedev/pipe/extensions/strings';
// or via the barrel:
import { ... } from '@bemedev/pipe/extensions';
```

---

### `toUpperCase`

```typescript
toUpperCase(value: string): string
```

Converts a string to uppercase (locale).

```typescript
import { pipe } from '@bemedev/pipe';
import { trim, toUpperCase } from '@bemedev/pipe/extensions/strings';

const shout = pipe(trim, toUpperCase);
shout('  bonjour '); // 'BONJOUR'
```

---

### `toLowerCase`

```typescript
toLowerCase(value: string): string
```

Converts a string to lowercase (locale).

```typescript
import { pipe } from '@bemedev/pipe';
import { trim, toLowerCase } from '@bemedev/pipe/extensions/strings';

const normalise = pipe(trim, toLowerCase);
normalise('  HELLO '); // 'hello'
```

---

### `trim`

```typescript
trim(value: string): string
```

Removes leading and trailing whitespace from a string.

```typescript
import { pipe } from '@bemedev/pipe';
import { trim, capitalize } from '@bemedev/pipe/extensions/strings';

const clean = pipe(trim, capitalize);
clean('   alice in wonderland  '); // 'Alice in wonderland'
```

---

### `capitalize`

```typescript
capitalize(value: string): string
```

Capitalizes the **first character** only (locale), leaves the rest intact.

```typescript
import { pipe } from '@bemedev/pipe';
import {
  trim,
  toLowerCase,
  capitalize,
} from '@bemedev/pipe/extensions/strings';

const formatSentence = pipe(trim, toLowerCase, capitalize);
formatSentence('  ALICE IN WONDERLAND  '); // 'Alice in wonderland'
```

---

### `escapeRegExp`

```typescript
escapeRegExp(value: string): string
```

Échappe tous les caractères spéciaux de la regex (`.*+?^${}()|[]\`) pour
permettre une utilisation sûre de la chaîne dans une expression régulière.

```typescript
import { pipe } from '@bemedev/pipe';
import { escapeRegExp } from '@bemedev/pipe/extensions/strings';

const toSafePattern = pipe(
  (s: string) => s,
  escapeRegExp,
  escaped => new RegExp(escaped, 'g'),
);

toSafePattern('1+1=2'); // /1\+1=2/g — + character properly escaped
```

---

### `replaceAll`

```typescript
replaceAll(...toRemove: string[]): (value: string) => string
```

Removes all occurrences of each listed string from the input value. Each
occurrence is searched with a global `RegExp` derived from `escapeRegExp`.

```typescript
import { pipe } from '@bemedev/pipe';
import { trim, replaceAll } from '@bemedev/pipe/extensions/strings';

const sanitize = pipe(
  trim,
  replaceAll('<script>', '</script>', 'javascript:'),
);

sanitize('  <script>alert(1)</script>  ');
// 'alert(1)'
```

```typescript
import { pipe } from '@bemedev/pipe';
import {
  trim,
  toLowerCase,
  replaceAll,
} from '@bemedev/pipe/extensions/strings';

// Slug cleanup
const toSlug = pipe(
  trim,
  toLowerCase,
  replaceAll(' ', '.', ',', '!', '?'),
);

toSlug('  Hello, World!  '); // 'hello'
```

---

### `concat`

```typescript
concat(...strings: string[]): (value: string) => string
```

Concatenates the provided strings **after** the input value.

```typescript
import { pipe } from '@bemedev/pipe';
import {
  trim,
  capitalize,
  concat,
} from '@bemedev/pipe/extensions/strings';

const greet = pipe(trim, capitalize, concat(', bienvenue !'));

greet('  alice '); // 'Alice, bienvenue !'
```

```typescript
import { pipe } from '@bemedev/pipe';
import { toUpperCase, concat } from '@bemedev/pipe/extensions/strings';

// Add file extension
const toFilename = pipe(toUpperCase, concat('.md'));

toFilename('readme'); // 'README.md'
```

<br/>

## Boolean Extensions

```typescript
import { ... } from '@bemedev/pipe/extensions/booleans';
// or via the barrel:
import { ... } from '@bemedev/pipe/extensions';
```

---

### `toggle`

```typescript
toggle(value: boolean): boolean
```

Inverts a boolean (`true` → `false`, `false` → `true`).

```typescript
import { pipe } from '@bemedev/pipe';
import { toggle } from '@bemedev/pipe/extensions/booleans';

const invert = pipe((flag: boolean) => flag, toggle);

invert(true); // false
invert(false); // true
```

```typescript
import { pipe } from '@bemedev/pipe';
import { toggle } from '@bemedev/pipe/extensions/booleans';

// Double inversion = identity
const noOp = pipe(toggle, toggle);
noOp(true); // true
noOp(false); // false
```

---

### `toNumber`

```typescript
toNumber(value: boolean): number
```

Converts a boolean to a number (`true` → `1`, `false` → `0`).

```typescript
import { pipe } from '@bemedev/pipe';
import { toggle, toNumber } from '@bemedev/pipe/extensions/booleans';

const boolToScore = pipe((flag: boolean) => flag, toNumber);

boolToScore(true); // 1
boolToScore(false); // 0
```

```typescript
import { pipe } from '@bemedev/pipe';
import { toggle, toNumber } from '@bemedev/pipe/extensions/booleans';

// Invert then convert
const invertedScore = pipe(toggle, toNumber);
invertedScore(true); // 0
invertedScore(false); // 1
```

<br/>

## Arithmetic Extensions

```typescript
import { ... } from '@bemedev/pipe/extensions/numbers/arithmetic';
// or via the barrel:
import { ... } from '@bemedev/pipe/extensions';
```

All operations follow the convention **`operation(toApply)(value)`** =
`fn(value, toApply)`. So `addBy(10)(5)` = `5 + 10 = 15`.

---

### `operation`

```typescript
operation(fn: (a: number, b: number) => number): (toApply: number) => (value: number) => number
```

Factory for curried arithmetic operations. Used to create `addBy`,
`timesBy`, `divisionBy`, `moduloBy`, and `exponentBy`. Allows defining any
custom binary operation.

```typescript
import { pipe } from '@bemedev/pipe';
import { operation } from '@bemedev/pipe/extensions/numbers/arithmetic';

const squareRoot = operation((a, b) => a ** (1 / b));

const sqrt = pipe((x: number) => x, squareRoot(2));

sqrt(9); // 3
sqrt(16); // 4
```

---

### `addBy`

```typescript
addBy(n: number): (value: number) => number
```

Adds `n` to the value.

```typescript
import { pipe } from '@bemedev/pipe';
import { addBy } from '@bemedev/pipe/extensions/numbers/arithmetic';

const addTax = pipe((price: number) => price, addBy(20));

addTax(100); // 120
```

---

### `timesBy`

```typescript
timesBy(n: number): (value: number) => number
```

Multiplies the value by `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { timesBy } from '@bemedev/pipe/extensions/numbers/arithmetic';

const double = pipe((x: number) => x, timesBy(2));

double(7); // 14
```

---

### `divisionBy`

```typescript
divisionBy(n: number): (value: number) => number
```

Divides the value by `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { divisionBy } from '@bemedev/pipe/extensions/numbers/arithmetic';

const half = pipe((x: number) => x, divisionBy(2));

half(42); // 21
```

---

### `moduloBy`

```typescript
moduloBy(n: number): (value: number) => number
```

Returns the remainder of dividing the value by `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { moduloBy } from '@bemedev/pipe/extensions/numbers/arithmetic';

const remainder = pipe((x: number) => x, moduloBy(3));

remainder(10); // 1  ← 10 % 3
remainder(9); // 0
```

---

### `exponentBy`

```typescript
exponentBy(n: number): (value: number) => number
```

Raises the value to the power `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { exponentBy } from '@bemedev/pipe/extensions/numbers/arithmetic';

const square = pipe((x: number) => x, exponentBy(2));

square(5); // 25
square(3); // 9
```

#### Combined Example: Complete Arithmetic Formula

```typescript
import { pipe } from '@bemedev/pipe';
import {
  addBy,
  timesBy,
  divisionBy,
  moduloBy,
  exponentBy,
} from '@bemedev/pipe/extensions/numbers/arithmetic';

const formula = pipe(
  (x: number) => x,
  addBy(10), // + 10
  timesBy(3), // × 3
  divisionBy(5), // ÷ 5
  moduloBy(7), // % 7
  exponentBy(2), // ²
);

formula(5); // (((5+10)×3)÷5)%7)² = (9%7)² = 4
```

<br/>

## Numeric Extensions — Checkers

```typescript
import { ... } from '@bemedev/pipe/extensions/numbers/checkers';
// or via the barrel:
import { ... } from '@bemedev/pipe/extensions';
```

---

### `isZero`

```typescript
isZero(...values: number[]): boolean
```

Returns `true` if the value is strictly equal to `0`. Equivalent to
`isValue(0)`.

```typescript
import { pipe } from '@bemedev/pipe';
import { isZero } from '@bemedev/pipe/extensions/numbers/checkers';

const checkDenominator = pipe((n: number) => n, isZero);

checkDenominator(0); // true  ← division impossible
checkDenominator(5); // false
```

---

### `isNotZero`

```typescript
isNotZero(...values: number[]): boolean
```

Returns `true` if the value is strictly different from `0`. Equivalent to
`isNotValue(0)`.

```typescript
import { pipe } from '@bemedev/pipe';
import { isNotZero } from '@bemedev/pipe/extensions/numbers/checkers';
import { divisionBy } from '@bemedev/pipe/extensions/numbers/arithmetic';

const safeDivide = pipe((n: number) => n, isNotZero);

safeDivide(5); // true  ← can divide
safeDivide(0); // false ← division by zero
```

---

### `compare`

```typescript
compare(toCompare: number): (value: number) => -1 | 0 | 1
```

Compares the value to `toCompare` and returns:

- `0` if equal
- `1` if `value > toCompare`
- `-1` if `value < toCompare`

```typescript
import { pipe } from '@bemedev/pipe';
import { compare } from '@bemedev/pipe/extensions/numbers/checkers';

const compareToTen = pipe((x: number) => x, compare(10));

compareToTen(5); // -1  ← 5 < 10
compareToTen(10); //  0  ← equal
compareToTen(15); //  1  ← 15 > 10
```

```typescript
import { pipe } from '@bemedev/pipe';
import { compare } from '@bemedev/pipe/extensions/numbers/checkers';

// Sort an array with compare
const sortAsc = (arr: number[]) =>
  [...arr].sort((a, b) => pipe((x: number) => x, compare(b))(a));

sortAsc([3, 1, 4, 1, 5]); // [1, 1, 3, 4, 5]
```

---

### `sign`

```typescript
sign(value: number): -1 | 0 | 1
```

Returns the sign of the value: `1` (positive), `-1` (negative), `0` (zero).
Equivalent to `compare(0)`.

```typescript
import { pipe } from '@bemedev/pipe';
import { sign } from '@bemedev/pipe/extensions/numbers/checkers';

const classify = pipe((x: number) => x, sign);

classify(-42); // -1
classify(0); //  0
classify(7); //  1
```

```typescript
import { pipe } from '@bemedev/pipe';
import { sign } from '@bemedev/pipe/extensions/numbers/checkers';
import { map } from '@bemedev/pipe/extensions/common';

// Convert sign to label
const signLabel = pipe(
  (x: number) => x,
  sign,
  map(branch => [
    branch({ cond: s => s === -1, fn: () => 'négatif' }),
    branch({ cond: s => s === 0, fn: () => 'zéro' }),
    branch({ cond: s => s === 1, fn: () => 'positif' }),
  ]),
);

signLabel(-5); // 'negative'
signLabel(0); // 'zero'
signLabel(8); // 'positive'
```

<br/>

## CHANGELOG

<details>
<summary>Changelog complet</summary>

[CHANGELOG.md](https://github.com/chlbri/pipeline/blob/main/CHANGELOG.md)

</details>

<br/>

## License

MIT

<br/>

## Author

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Links

- [Documentation](https://github.com/chlbri/pipeline)
