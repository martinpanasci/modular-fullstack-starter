import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const noFeatureInternals = {
  group: ['@/features/*/*'],
  message:
    'Import from the feature public API (for example, @/features/auth) instead of its internals.',
};

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [noFeatureInternals] }],
    },
  },
  {
    files: ['src/shared/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            noFeatureInternals,
            {
              group: ['@/features', '@/features/*'],
              message: 'Shared code cannot depend on domain features.',
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
  globalIgnores([
    '.next/**',
    'coverage/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**',
  ]),
]);
