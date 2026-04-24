import { createImportFnTests } from '@bemedev/dev-utils/build-tests';

describe(
  ...createImportFnTests({
    path: 'extensions/numbers/checkers',
    SUCCESS: ['isZero', 'isNotZero', 'compare', 'sign'],
    FAILS: [
      'identity',
      'isValue',
      'isNotValue',
      'voidAction',
      'tap',
      'flatten',
      'mapArray',
      'map',
      'toggleMap',
      'operation',
      'addBy',
      'timesBy',
      'divisionBy',
      'moduloBy',
      'exponentBy',
      'multiplyBy',
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
