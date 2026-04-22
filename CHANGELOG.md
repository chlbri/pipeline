# Changelog

**N.B :** Open all links in a new tab to avoid losing your place in the
documentation.

<br/>

Tous les changements notables apportés à ce projet seront documentés dans
ce fichier.

<br/>

<details>
<summary>

## **[1.0.0] - 22/04/2026** => _08:07_

</summary>

- Refactor: renommer le type `Fn1` en `Fn<Args, R>` (paramètres génériques
  explicites) — **breaking change**
- Add: nouveau fichier `constants.ts` exportant `ASYNC_CONSTRUCTOR_NAME`
- Add: nouveau fichier `pipe.helpers.ts` exportant `isFnPromise` (détection
  de fonction async)
- Refactor: utiliser `isFnPromise` dans `pipe.ts` pour la détection async
  (remplace la vérification de `constructor.name`)
- Refactor: déplacer la déstructuration `[fn1, ...rest]` hors des branches
  if/else dans `pipe.ts`
- Fix: ajouter `beforeAll(() => vi.useFakeTimers())` dans la suite de tests
  async
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.2.0] - 22/04/2026** => _00:25_

</summary>

- Update: mise à jour des dépendances (feat: Upgrade deps)
- Fix: ajustements mineurs suite à la mise à jour des dépendances

</details>

<br/>

<details>
<summary>

## **[0.1.1] - 13/04/2026** => _00:00_

</summary>

- Refactor: déplacer `flatten` et `mapArray` vers `fixtures.ts` (usage test
  uniquement)
- Update: migrer le bundler de rollup vers rolldown
- Update: migrer le linter de eslint vers oxlint
- Update: migrer le formateur de prettier vers oxfmt
- Update: élever la version minimale de Node.js de >=20 à >=24
- Update: mettre à jour toutes les dépendances
- <u>Test coverage **_100%_**</u>

</details>

<br/>

## [0.1.0] - 2025-10-06 -- 21:28

### Added

- Add async functions
- Async functions tested
- `objects.ts` extensions is now `fixtures.ts` extensions, it is not longer
  part of the lib. It is used only for testing purposes.
- 100% test coverage

<br/>

## [0.0.9] - 2025-06-15 -- 23:00

### Added

- Add extensions methods
- 100% test coverage
- Don't use vitest to test inner .ts files, just .test-d.ts files

<br/>

## [0.0.2] - 2025-06-14 -- 12:30

### Ajouts

- **feat(core)**: Implémente `pipe` avec support jusqu'à 20 fonctions
  typées
- **feat(core)**: Ajoute `pipe.notTyped` pour les chaînes illimitées
- **feat(types)**: Intègre les types utilitaires essentiels
- **test(core)**: Fournit une suite de tests complète
- **docs**: Améliore la documentation avec des exemples détaillés

### Modifications

- **style(types)**: Optimise la structure pour une meilleure inférence
  TypeScript

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
