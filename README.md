# @bemedev/pipe

**N.B :** Open all links in a new tab to avoid losing your place in the
documentation.

<br/>

Une bibliothèque élégante pour composer des fonctions en TypeScript.
Simplifiez votre code en créant des pipelines de traitement typés et
performants.

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

## Utilisation

```typescript
import { pipe } from '@bemedev/pipeline';

// Exemple simple
const add1 = (x: number) => x + 1;
const double = (x: number) => x * 2;

const piped = pipe(add1, double);
console.log(piped(2)); // Affiche 6 (= (2+1)*2)

// Exemple plus complexe
const processData = pipe(
  (x: number) => x + 1, // Ajoute 1
  x => x * 2, // Multiplie par 2
  x => x - 3, // Soustrait 3
  x => x / 2, // Divise par 2
  x => x ** 2, // Élève au carré
);

console.log(processData(2)); // Affiche 2.25 (= ((((2+1)*2)-3)/2)^2)
```

## API

### pipe(...fns)

Crée un pipeline de fonctions, où chaque fonction reçoit le résultat de la
précédente.

#### Caractéristiques

- Entièrement typé (jusqu'à 20 fonctions)
- Performances optimisées
- Support de TypeScript avec inférence de types

#### Exemples d'utilisation avancée

```typescript
// Transformation de chaînes
const formatText = pipe(
  (s: string) => s.trim(),
  s => s.toUpperCase(),
  s => s + '!',
);
console.log(formatText('  hello ')); // Affiche "HELLO!"

// Manipulation d'objets
const enrichObject = pipe(
  (obj: { a: number }) => ({ ...obj, b: obj.a + 1 }),
  obj => ({ ...obj, c: obj.b * 2 }),
);
console.log(enrichObject({ a: 1 })); // Affiche { a: 1, b: 2, c: 4 }
```

### pipe.notTyped(...fns)

Version non typée de `pipe` pour les cas où vous avez besoin de chaîner
plus de 20 fonctions.

```typescript
// Chaîner un grand nombre de fonctions
const addMany = pipe.notTyped(
  ...Array.from({ length: 100 }, () => (x: number) => x + 1),
);
console.log(addMany(0)); // Affiche 100
```

## Types utilitaires

La bibliothèque exporte plusieurs types utiles:

- `Fn<Args, R>`: Type de base pour une fonction (remplace `Fn1`)
- `NextFn<T>`: Fonction prenant comme argument le type de retour de T
- `TupleOfLength<T, N>`: Tuple de longueur N contenant des éléments de type
  T

Et plusieurs utilitaires runtime:

- `isFnPromise(value)`: Prédicat vérifiant si une valeur est une fonction
  asynchrone
- `ASYNC_CONSTRUCTOR_NAME`: Constante utilisée pour la détection de
  fonctions asynchrones

## Extensions

La bibliothèque propose des extensions utiles pour manipuler différents
types de données:

### Extensions pour les chaînes

```typescript
import {
  toUpperCase,
  capitalize,
  trim,
} from '@bemedev/pipe/extensions/strings';

const format = pipe(trim, capitalize, toUpperCase);

console.log(format('  hello world  ')); // "HELLO WORLD"
```

### Extensions pour les nombres

```typescript
import { isEven, isOdd } from '@bemedev/pipe/extensions/numbers/checkers';
import { add } from '@bemedev/pipe/extensions/numbers/arithmetic';

const checkEven = isEven(5); // false
const checkOdd = isOdd(5); // true
```

### Extensions communes

```typescript
import { identity, voidAction } from '@bemedev/pipe/extensions/common';

const log = voidAction((val: number) => console.log(val));
const piped = pipe(
  (x: number) => x * 2,
  log, // Affiche le résultat intermédiaire
  (x: number) => x + 1,
);

console.log(piped(5)); // Affiche 10, puis retourne 11
```

#### Cas d'usage réel : Debug et transformation

`voidAction` est particulièrement utile pour ajouter du logging ou du
debugging dans une chaîne sans modifier les données :

```typescript
import { voidAction } from '@bemedev/pipe/extensions/common';

const processUser = pipe(
  (user: { name: string; age: number }) => ({
    ...user,
    age: user.age + 1,
  }),
  voidAction(user => console.log('✓ Age updated:', user)),
  user => ({ ...user, name: user.name.toUpperCase() }),
  voidAction(user => console.log('✓ Name formatted:', user)),
);

processUser({ name: 'alice', age: 30 });
// Affiche:
// ✓ Age updated: { name: 'alice', age: 31 }
// ✓ Name formatted: { name: 'ALICE', age: 31 }
// Retourne: { name: 'ALICE', age: 31 }
```

## CHANGELOG

<details>
<summary>Changelog complet</summary>

[CHANGE_LOG.md](https://github.com/chlbri/pipeline/blob/main/CHANGE_LOG.md)

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

- [Documentation](https://github.com/chlbri/new-package)
