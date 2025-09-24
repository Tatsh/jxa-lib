import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  [
    globalIgnores(['coverage', 'dist']),
    { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
  ].concat([
    {
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
    { rules: { '@typescript-eslint/no-unused-expressions': 'off' } },
  ]),
);
