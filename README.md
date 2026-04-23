# @bemedev/pipe

**N.B :** Open all links in a new tab to avoid losing your place in the
documentation.

<br/>

Une bibliothèque élégante pour composer des fonctions en TypeScript.
Simplifiez votre code en créant des pipelines de traitement typés,
performants et entièrement inférés — avec support async natif.

<br/>

## Table des matières

1. [Installation](#installation)
2. [Utilisation rapide](#utilisation-rapide)
3. [API principale](#api-principale)
   - [pipe](#pipe)
   - [pipe.notTyped](#pipenottyped)
4. [Types utilitaires](#types-utilitaires)
5. [Utilitaires runtime](#utilitaires-runtime)
6. [Extensions communes](#extensions-communes)
   - [identity](#identity)
   - [isValue](#isvalue)
   - [isNotValue](#isnotvalue)
   - [voidAction / tap](#voidaction--tap)
   - [flatten](#flatten)
   - [mapArray](#maparray)
   - [map](#map)
   - [toggleMap](#togglemap)
7. [Extensions pour les chaînes](#extensions-pour-les-chaînes)
8. [Extensions pour les booléens](#extensions-pour-les-booléens)
9. [Extensions arithmétiques](#extensions-arithmétiques)
10. [Extensions numériques — vérificateurs](#extensions-numériques--vérificateurs)
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
bun add @bemedev/pipe
```

<br/>

## Utilisation rapide

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

## API principale

### `pipe`

```typescript
import { pipe } from '@bemedev/pipe';
```

Crée un pipeline de fonctions où chaque fonction reçoit le résultat de la
précédente. Le typage est entièrement inféré, jusqu'à **100 fonctions**.

- Seule la **première** fonction peut recevoir plusieurs arguments.
- Les fonctions suivantes reçoivent exactement **un** argument.
- Si au moins une fonction est `async`, toute la pipeline devient
  **asynchrone** et retourne une `Promise`.

#### Pipeline synchrone

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

#### Pipeline multi-arguments (premier pas uniquement)

```typescript
import { pipe } from '@bemedev/pipe';

const hypotenuse = pipe(
  (a: number, b: number) => a ** 2 + b ** 2,
  Math.sqrt,
);

hypotenuse(3, 4); // 5
```

#### Pipeline asynchrone

Dès qu'une fonction `async` est présente, le résultat final est une
`Promise`. Les fonctions synchrones suivantes reçoivent automatiquement la
valeur résolue (`Awaited`).

```typescript
import { pipe } from '@bemedev/pipe';

const fetchUser = pipe(
  async (id: number) => ({ id, name: 'Alice' }),
  user => ({ ...user, greeting: `Hello, ${user.name}!` }),
);

const result = await fetchUser(1);
// { id: 1, name: 'Alice', greeting: 'Hello, Alice!' }
```

#### Pipeline objet

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

Version non typée de `pipe`. Permet de chaîner un nombre **illimité** de
fonctions sans contrainte de typage générique. Utile lorsque le nombre de
fonctions dépasse 100 ou dans des cas dynamiques.

```typescript
import { pipe } from '@bemedev/pipe';

// Chaîne de 100 incrémentations
const increment100 = pipe.notTyped(
  ...Array.from({ length: 100 }, () => (x: number) => x + 1),
);

increment100(0); // 100
```

```typescript
import { pipe } from '@bemedev/pipe';

// Construction dynamique d'un pipeline
const steps: Array<(x: string) => string> = [
  s => s.trim(),
  s => s.toUpperCase(),
  s => `[${s}]`,
];

const format = pipe.notTyped(...steps);
format('  hello '); // '[HELLO]'
```

<br/>

## Types utilitaires

Exportés depuis `@bemedev/pipe`.

### `Fn<Args, R>`

Type de base pour n'importe quelle fonction.

```typescript
import type { Fn } from '@bemedev/pipe';

type Double = Fn<[number], number>;
// équivalent à : (x: number) => number

const double: Double = x => x * 2;
const result = pipe(double)(5); // 10
```

---

### `NextFn<T>`

Type d'une fonction qui prend en argument le **type de retour résolu**
(`Awaited<ReturnType<T>>`) d'une autre fonction.

```typescript
import type { Fn, NextFn } from '@bemedev/pipe';

type Step1 = Fn<[number], Promise<string>>;
type Step2 = NextFn<Step1>; // (arg: string) => any
```

---

### `TupleOfLength<T, N>`

Construit un tuple de longueur exacte `N` dont chaque élément est de type
`T`.

```typescript
import type { TupleOfLength } from '@bemedev/pipe';

type Three = TupleOfLength<number, 3>; // [number, number, number]
```

---

### `MaybePromise<T>`

Retourne `Promise<Last>` si au moins un élément du tuple `T` est une
`Promise`, sinon retourne `Last` directement.

```typescript
import type { MaybePromise } from '@bemedev/pipe';

type Sync = MaybePromise<[number, string]>; // string
type Async = MaybePromise<[Promise<number>, string]>; // Promise<string>
```

---

### `MaybePromiseFn<Args, R>`

Type d'une fonction pipeline résultante : synchrone ou asynchrone selon le
contenu de `R`.

```typescript
import type { MaybePromiseFn } from '@bemedev/pipe';

type SyncPipe = MaybePromiseFn<[number], [number, string]>;
// (...args: [number]) => string

type AsyncPipe = MaybePromiseFn<[number], [Promise<number>, string]>;
// (...args: [number]) => Promise<string>
```

<br/>

## Utilitaires runtime

Exportés depuis `@bemedev/pipe`.

### `isFnPromise`

```typescript
isFnPromise(value?: unknown): value is Fn<any[], Promise<any>>
```

Prédicat retournant `true` si `value` est une **fonction asynchrone** (dont
le `constructor.name` est `"AsyncFunction"`). Utilisé en interne par `pipe`
pour décider d'une exécution sync ou async.

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

Constante utilisée par `isFnPromise` pour identifier les fonctions async.
Exportée pour permettre des contrôles personnalisés cohérents.

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

## Extensions communes

```typescript
import { ... } from '@bemedev/pipe/extensions/common';
// ou via le barrel :
import { ... } from '@bemedev/pipe/extensions';
```

---

### `identity`

```typescript
identity<T>(value: T): T
```

Retourne la valeur reçue sans la modifier. Utile comme étape neutre,
marqueur de type ou valeur par défaut dans un pipeline.

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

Retourne un prédicat variadic qui vérifie si **au moins une** des valeurs
passées est strictement égale à `toCompare`. Dans un pipeline, reçoit une
seule valeur depuis l'étape précédente.

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

// Utilisé avec des valeurs numériques
const isZeroCustom = pipe((x: number) => x, isValue(0));

isZeroCustom(0); // true
isZeroCustom(42); // false
```

---

### `isNotValue`

```typescript
isNotValue<T>(toCompare: T): (...values: T[]) => boolean
```

Retourne un prédicat variadic qui vérifie si **toutes** les valeurs passées
sont strictement différentes de `toCompare`. Inverse de `isValue`.

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

Exécute `fn` en tant qu'**effet de bord** (logging, mutation externe,
débogage…) et propage la valeur originale **sans la modifier**. `tap` est
un alias strict de `voidAction`.

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

// Persistance en base de données (effet de bord)
const saveAndReturn = pipe(
  (user: { name: string }) => user,
  voidAction(user => db.save(user)), // retourne toujours user
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

// Utile pour comparer ou sérialiser des structures profondes
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
// Signature à 1 clé  → retourne la valeur directement
mapArray<K>(key: K): (obj: Record<K, T>) => T

// Signature à N clés → retourne un tuple
mapArray<K1, K2, ...Ks>(k1, k2, ...ks): (obj) => [T1, T2, ...]
```

Extrait une ou plusieurs propriétés d'un objet. Avec **une seule clé**,
retourne la valeur directement. Avec **plusieurs clés**, retourne un tuple
dans le même ordre.

```typescript
import { pipe } from '@bemedev/pipe';
import { mapArray } from '@bemedev/pipe/extensions/common';

// Extraction d'une seule propriété
const getName = pipe(
  (user: { name: string; age: number; role: string }) => user,
  mapArray('name'),
);

getName({ name: 'Alice', age: 30, role: 'admin' }); // 'Alice'
```

```typescript
import { pipe } from '@bemedev/pipe';
import { mapArray } from '@bemedev/pipe/extensions/common';

// Extraction de plusieurs propriétés → tuple typé
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

// Chaînage après flatten
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

Applique la **première branche dont la condition est vérifiée** et retourne
sa transformation. Si aucune branche ne correspond, la valeur est retournée
inchangée. Permet d'implémenter un pattern-matching expressif à l'intérieur
d'un pipeline.

Chaque branche est un objet `{ cond, fn }` :

- `cond: (value: T) => boolean` — condition de déclenchement
- `fn: (value: subtype) => T` — transformation

```typescript
import { pipe } from '@bemedev/pipe';
import { map } from '@bemedev/pipe/extensions/common';

// Clamper une valeur entre 0 et 100
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

// Normalisation d'un statut HTTP en libellé
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
statusLabel(100); // 100  ← aucune branche → valeur inchangée
```

```typescript
import { pipe } from '@bemedev/pipe';
import { map } from '@bemedev/pipe/extensions/common';

// Discrimination de type dans un pipeline union
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
// Forme positionnelle
toggleMap<T>(
  condition: (value: T) => boolean,
  truthy: (value: T) => T,
  falsy:  (value: T) => T,
): (value: T) => T

// Forme objet
toggleMap<T>({
  condition: (value: T) => boolean,
  truthy: (value: T) => T,
  falsy:  (value: T) => T,
}): (value: T) => T
```

Applique `truthy` si la condition est vérifiée, `falsy` sinon. Version
simplifiée de `map` pour les cas binaires. Supporte deux syntaxes.

```typescript
import { pipe } from '@bemedev/pipe';
import { toggleMap } from '@bemedev/pipe/extensions/common';

// Valeur absolue (forme positionnelle)
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

// Normalisation d'une note (forme objet)
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

## Extensions pour les chaînes

```typescript
import { ... } from '@bemedev/pipe/extensions/strings';
// ou via le barrel :
import { ... } from '@bemedev/pipe/extensions';
```

---

### `toUpperCase`

```typescript
toUpperCase(value: string): string
```

Convertit une chaîne en majuscules (locale).

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

Convertit une chaîne en minuscules (locale).

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

Supprime les espaces en début et en fin de chaîne.

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

Met en majuscule le **premier caractère** uniquement (locale), laisse le
reste intact.

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

toSafePattern('1+1=2'); // /1\+1=2/g — caractère + correctement échappé
```

---

### `replaceAll`

```typescript
replaceAll(...toRemove: string[]): (value: string) => string
```

Supprime toutes les occurrences de chaque chaîne listée dans la valeur
d'entrée. Chaque occurrence est cherchée avec un `RegExp` global dérivé
d'`escapeRegExp`.

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

// Nettoyage d'un slug
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

Concatène les chaînes fournies **après** la valeur d'entrée.

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

// Ajout d'extension de fichier
const toFilename = pipe(toUpperCase, concat('.md'));

toFilename('readme'); // 'README.md'
```

<br/>

## Extensions pour les booléens

```typescript
import { ... } from '@bemedev/pipe/extensions/booleans';
// ou via le barrel :
import { ... } from '@bemedev/pipe/extensions';
```

---

### `toggle`

```typescript
toggle(value: boolean): boolean
```

Inverse un booléen (`true` → `false`, `false` → `true`).

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

// Double inversion = identité
const noOp = pipe(toggle, toggle);
noOp(true); // true
noOp(false); // false
```

---

### `toNumber`

```typescript
toNumber(value: boolean): number
```

Convertit un booléen en nombre (`true` → `1`, `false` → `0`).

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

// Inverser puis convertir
const invertedScore = pipe(toggle, toNumber);
invertedScore(true); // 0
invertedScore(false); // 1
```

<br/>

## Extensions arithmétiques

```typescript
import { ... } from '@bemedev/pipe/extensions/numbers/arithmetic';
// ou via le barrel :
import { ... } from '@bemedev/pipe/extensions';
```

Toutes les opérations suivent la convention **`operation(toApply)(value)`**
= `fn(value, toApply)`. Ainsi `add(10)(5)` = `5 + 10 = 15`.

---

### `operation`

```typescript
operation(fn: (a: number, b: number) => number): (toApply: number) => (value: number) => number
```

Fabrique d'opérations arithmétiques curryfiées. Utilisée pour créer `add`,
`times`, `division`, `modulo` et `exponent`. Permet de définir toute
opération binaire personnalisée.

```typescript
import { pipe } from '@bemedev/pipe';
import { operation } from '@bemedev/pipe/extensions/numbers/arithmetic';

const squareRoot = operation((a, b) => a ** (1 / b));

const sqrt = pipe((x: number) => x, squareRoot(2));

sqrt(9); // 3
sqrt(16); // 4
```

---

### `add`

```typescript
add(n: number): (value: number) => number
```

Additionne `n` à la valeur.

```typescript
import { pipe } from '@bemedev/pipe';
import { add } from '@bemedev/pipe/extensions/numbers/arithmetic';

const addTax = pipe((price: number) => price, add(20));

addTax(100); // 120
```

---

### `times`

```typescript
times(n: number): (value: number) => number
```

Multiplie la valeur par `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { times } from '@bemedev/pipe/extensions/numbers/arithmetic';

const double = pipe((x: number) => x, times(2));

double(7); // 14
```

---

### `division`

```typescript
division(n: number): (value: number) => number
```

Divise la valeur par `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { division } from '@bemedev/pipe/extensions/numbers/arithmetic';

const half = pipe((x: number) => x, division(2));

half(42); // 21
```

---

### `modulo`

```typescript
modulo(n: number): (value: number) => number
```

Retourne le reste de la division de la valeur par `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { modulo } from '@bemedev/pipe/extensions/numbers/arithmetic';

const remainder = pipe((x: number) => x, modulo(3));

remainder(10); // 1  ← 10 % 3
remainder(9); // 0
```

---

### `exponent`

```typescript
exponent(n: number): (value: number) => number
```

Élève la valeur à la puissance `n`.

```typescript
import { pipe } from '@bemedev/pipe';
import { exponent } from '@bemedev/pipe/extensions/numbers/arithmetic';

const square = pipe((x: number) => x, exponent(2));

square(5); // 25
square(3); // 9
```

#### Exemple combiné : formule arithmétique complète

```typescript
import { pipe } from '@bemedev/pipe';
import {
  add,
  times,
  division,
  modulo,
  exponent,
} from '@bemedev/pipe/extensions/numbers/arithmetic';

const formula = pipe(
  (x: number) => x,
  add(10), // + 10
  times(3), // × 3
  division(5), // ÷ 5
  modulo(7), // % 7
  exponent(2), // ²
);

formula(5); // (((5+10)×3)÷5)%7)² = (9%7)² = 4
```

<br/>

## Extensions numériques — vérificateurs

```typescript
import { ... } from '@bemedev/pipe/extensions/numbers/checkers';
// ou via le barrel :
import { ... } from '@bemedev/pipe/extensions';
```

---

### `isZero`

```typescript
isZero(...values: number[]): boolean
```

Retourne `true` si la valeur est strictement égale à `0`. Équivalent à
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

Retourne `true` si la valeur est strictement différente de `0`. Équivalent
à `isNotValue(0)`.

```typescript
import { pipe } from '@bemedev/pipe';
import { isNotZero } from '@bemedev/pipe/extensions/numbers/checkers';
import { division } from '@bemedev/pipe/extensions/numbers/arithmetic';

const safeDivide = pipe((n: number) => n, isNotZero);

safeDivide(5); // true  ← peut diviser
safeDivide(0); // false ← division par zéro
```

---

### `compare`

```typescript
compare(toCompare: number): (value: number) => -1 | 0 | 1
```

Compare la valeur à `toCompare` et retourne :

- `0` si égaux
- `1` si `value > toCompare`
- `-1` si `value < toCompare`

```typescript
import { pipe } from '@bemedev/pipe';
import { compare } from '@bemedev/pipe/extensions/numbers/checkers';

const compareToTen = pipe((x: number) => x, compare(10));

compareToTen(5); // -1  ← 5 < 10
compareToTen(10); //  0  ← égal
compareToTen(15); //  1  ← 15 > 10
```

```typescript
import { pipe } from '@bemedev/pipe';
import { compare } from '@bemedev/pipe/extensions/numbers/checkers';

// Tri d'un tableau avec compare
const sortAsc = (arr: number[]) =>
  [...arr].sort((a, b) => pipe((x: number) => x, compare(b))(a));

sortAsc([3, 1, 4, 1, 5]); // [1, 1, 3, 4, 5]
```

---

### `sign`

```typescript
sign(value: number): -1 | 0 | 1
```

Retourne le signe de la valeur : `1` (positif), `-1` (négatif), `0` (zéro).
Équivalent à `compare(0)`.

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

// Convertir le signe en libellé
const signLabel = pipe(
  (x: number) => x,
  sign,
  map(branch => [
    branch({ cond: s => s === -1, fn: () => 'négatif' }),
    branch({ cond: s => s === 0, fn: () => 'zéro' }),
    branch({ cond: s => s === 1, fn: () => 'positif' }),
  ]),
);

signLabel(-5); // 'négatif'
signLabel(0); // 'zéro'
signLabel(8); // 'positif'
```

<br/>

## CHANGELOG

<details>
<summary>Changelog complet</summary>

[CHANGELOG.md](https://github.com/chlbri/pipeline/blob/main/CHANGELOG.md)

</details>

<br/>

## Licence

MIT

<br/>

## Auteur

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Liens

- [Documentation](https://github.com/chlbri/pipeline)
