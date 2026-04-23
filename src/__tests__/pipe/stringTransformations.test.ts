import {
  capitalize,
  concat,
  escapeRegExp,
  replaceAll,
  toLowerCase,
  toUpperCase,
  trim,
} from '../../extensions';
import { pipe } from '../../pipe';

describe('#02 => should handle string transformations', () => {
  it('#01 => string pipe chain', () => {
    const piped = pipe(
      trim,
      toUpperCase,
      toLowerCase,
      capitalize,
      escapeRegExp,
      concat('!'),
      concat('toRemove', 'toRemove', 'toRemove', 'toRemove', 'toRemove'),
      concat('toRemove2'),
      concat('toRemove2'),
      concat('toRemove3'),
      concat('toRemove3'),
      replaceAll('toRemove', '2', '3'),
    );
    expect(piped('  hello ')).toBe('Hello!');
  });
});
