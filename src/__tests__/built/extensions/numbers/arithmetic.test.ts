import { createImportFnTests } from '@bemedev/dev-utils/build-tests';

describe(
  ...createImportFnTests({
    path: 'extensions/numbers/arithmetic',
    SUCCESS: [
      'operation',
      'addBy',
      'timesBy',
      'divisionBy',
      'moduloBy',
      'exponentBy',
      'multiplyBy',
    ],
    FAILS: [
      'identity',
      'isValue',
      'isNotValue',
      'voidAction',
      'tap',
      'monad',
      'toggleMonad',
      'flatten',
      'mapArray',
      'isZero',
      'isNotZero',
      'compare',
      'sign',
      'toUpperCase',
      'toLowerCase',
      'trim',
      'capitalize',
      'escapeRegExp',
      'replaceAll',
      'concat',
    ],
  }),
);
