import { aliasTs } from '@bemedev/dev-utils/vitest-alias';
import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';

const IS_EXTENSION = process.env.VITEST_VSCODE === 'true';

export default defineConfig({
  plugins: [
    aliasTs(tsconfig as any),
    exclude({
      ignoreCoverageFiles: [
        '**/index.ts',
        'src/types.ts',
        '**/**.test-d.ts',
        '**/__tests__/**',
      ],
      ignoreTestFiles: IS_EXTENSION
        ? ['**/__tests__/built/**']
        : undefined,
    }),
  ],
  test: {
    bail: 10,
    maxConcurrency: 10,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,
    hookTimeout: 50_000,
    logHeapUsage: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      enabled: true,
      reportsDirectory: '.coverage',
      provider: 'v8',
    },
    typecheck: {
      enabled: true,
      ignoreSourceErrors: true,
    },
  },
});
