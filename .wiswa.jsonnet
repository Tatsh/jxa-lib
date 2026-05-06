local utils = import 'utils.libjsonnet';

{
  uses_user_defaults: true,
  project_type: 'typescript',
  project_name: 'jxa-lib',
  version: '0.1.10',
  description: 'General library for AppleScript (JXA).',
  keywords: ['applescript', 'jxa', 'macos', 'typescript'],
  want_main: false,
  security_policy_supported_versions: { '0.1.x': ':white_check_mark:' },
  // TypeScript only
  package_json+: {
    dependencies+: { ramda: utils.latestNpmPackageVersionCaret('ramda') },
    devDependencies+: {
      '@types/ramda': utils.latestNpmPackageVersionCaret('@types/ramda'),
      '@vitest/coverage-v8': utils.latestNpmPackageVersionCaret('@vitest/coverage-v8'),
      globals: utils.latestNpmPackageVersionCaret('globals'),
      'jxa-types': utils.latestNpmPackageVersionCaret('jxa-types'),
      vitest: utils.latestNpmPackageVersionCaret('vitest'),
      // Drop the Jest stack now that Vitest is the test runner.
      '@types/jest': null,
      jest: null,
      'ts-jest': null,
    },
    files+: ['dist/**/*.js', 'dist/**/*.d.ts'],
    main: 'dist/index.js',
    scripts+: { test: 'vitest run' },
    types: './dist/',
  },
  eslint+: [{ rules: { '@typescript-eslint/no-unused-expressions': 'off' } }],
  tsconfig+: {
    compilerOptions+: {
      module: 'commonjs',
      declaration: true,
      emitDecoratorMetadata: true,
      lib: ['es2018'],
      newLine: 'LF',
      noEmitOnError: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: './dist/',
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: false,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      target: 'es2018',
      types: ['jxa-types', 'node'],
    },
    include: ['src'],
  },
}
