import { createImportFnTests } from '@bemedev/dev-utils/build-tests';

describe(
  ...createImportFnTests({
    path: 'extensions/common',
    SUCCESS: [
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
    FAILS: [
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
  }),
);
