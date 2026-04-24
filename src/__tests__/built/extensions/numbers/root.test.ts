import { createImportFnTests } from '@bemedev/dev-utils/build-tests';

describe(
  ...createImportFnTests({
    path: 'extensions/numbers',
    SUCCESS: [
      'operation',
      'addBy',
      'timesBy',
      'divisionBy',
      'moduloBy',
      'exponentBy',
      'multiplyBy',
      'isZero',
      'isNotZero',
      'compare',
      'sign',
    ],
    FAILS: [
      'identity',
      'isValue',
      'isNotValue',
      'voidAction',
      'tap',
      'map',
      'toggleMap',
      'flatten',
      'mapArray',
    ],
  }),
);
