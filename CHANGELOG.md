# Changelog

**N.B :** Open all links in a new tab to avoid losing your place in the
documentation.

<br/>

All notable changes to this project will be documented in this file.

<br/>

<details>
<summary>

## **[1.5.1] - 23/04/2026** => _19:35_

</summary>

- Fix: allow `toggleMap` to omit `falsy` and preserve the original value
  when the condition is false
- Update: expand `toggleMap` overloads so object form may omit `condition`
  and only require `truthy`
- Update: bump `@vitest/coverage-v8`, `@vitest/ui`, and `vitest` to `4.1.5`

</details>

<br/>

<details>
<summary>

## **[1.5.0] - 23/04/2026** => _14:30_

</summary>

- **BREAKING**: Rename arithmetic function exports from `add`, `times`,
  `division`, `multiply`, `modulo`, `exponent` to `addBy`, `timesBy`,
  `divisionBy`, `multiplyBy`, `moduloBy`, `exponentBy` for clarity and
  consistency
- Refactor: reorganize test files into `src/__tests__/built/` structure for
  better test categorization
- Update: modify all test imports and usages to reflect new arithmetic
  function names
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[1.4.0] - 23/04/2026** => _10:22_

</summary>

- Add: `map` helper in `extensions/common` for condition-based
  transformation, and `toggleMap` for boolean toggling
- Add: `tap` alias for `voidAction` to enable pipeline side effects without
  changing the value
- Update: restructure `src/extensions/common` into dedicated extension
  files
- Update: export `./extensions/common` from `package.json`
- Fix: exclude TypeScript files from the `rolldown` build with `excludesTS`
- Fix: improve console mocking in `vitest.setup.ts`

</details>

<br/>

<details>
<summary>

## **[1.3.1] - 22/04/2026** => _23:56_

</summary>

- Update: bump `@bemedev/dev-utils` to `^0.6.4`
- Fix: improve built import tests with async pipeline coverage and fake
  timer setup

</details>

<br/>

<details>
<summary>

## **[1.2.0] - 22/04/2026** => _19:43_

</summary>

- Refactor: `pipe` typings now use `MaybePromiseFn` for better async
  inference and broader typed pipeline support
- Add: `tap` alias in `extensions/common`
- Update: `package.json` exports for `./extensions`
- Fix: README docs and changelog link

</details>

<br/>

<details>
<summary>

## **[1.1.0] - 22/04/2026** => _08:30_

</summary>

- **BREAKING CHANGE**: Rename type `Fn1` to `Fn<Args, R>` (explicit generic
  parameters)
- Add: new `constants.ts` file exporting `ASYNC_CONSTRUCTOR_NAME`
- Add: new `pipe.helpers.ts` file exporting `isFnPromise` (async function
  detection)
- Add: new extensions (booleans, strings, numbers/arithmetic,
  numbers/checkers, common)
- Refactor: use `isFnPromise` in `pipe.ts` for async detection
- Refactor: reorganize functions and types
- Fix: add `beforeAll(() => vi.useFakeTimers())` to async test suite
- Update: update all dependencies
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[1.0.0] - 22/04/2026** => _08:07_

</summary>

- Refactor: rename type `Fn1` to `Fn<Args, R>` (explicit generic
  parameters) — **breaking change**
- Add: new `constants.ts` file exporting `ASYNC_CONSTRUCTOR_NAME`
- Add: new `pipe.helpers.ts` file exporting `isFnPromise` (async function
  detection)
- Refactor: use `isFnPromise` in `pipe.ts` for async detection (replaces
  `constructor.name` check)
- Refactor: move destructuring `[fn1, ...rest]` outside if/else branches in
  `pipe.ts`
- Fix: add `beforeAll(() => vi.useFakeTimers())` to async test suite
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.2.0] - 22/04/2026** => _00:25_

</summary>

- Update: update dependencies (feat: Upgrade deps)
- Fix: minor adjustments following dependency update

</details>

<br/>

<details>
<summary>

## **[0.1.1] - 13/04/2026** => _00:00_

</summary>

- Refactor: move `flatten` and `mapArray` to `fixtures.ts` (test usage
  only)
- Update: migrate bundler from rollup to rolldown
- Update: migrate linter from eslint to oxlint
- Update: migrate formatter from prettier to oxfmt
- Update: raise minimum Node.js version from >=20 to >=24
- Update: update all dependencies
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

### Added

- **feat(core)**: Implements `pipe` with support for up to 20 typed
  functions
- **feat(core)**: Adds `pipe.notTyped` for unlimited chains
- **feat(types)**: Integrates essential utility types
- **test(core)**: Provides comprehensive test suite
- **docs**: Improves documentation with detailed examples

### Changed

- **style(types)**: Optimizes structure for better TypeScript inference

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
