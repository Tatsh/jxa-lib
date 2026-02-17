local utils = import 'utils.libjsonnet';

{
  project_type: 'typescript',
  project_name: 'jxa-lib',
  version: '0.1.9',
  description: 'General library for AppleScript (JXA).',
  keywords: ['applescript', 'jxa', 'macos', 'typescript'],
  want_main: false,
  copilot+: {
    intro: 'jxa-lib is a library for JXA (JavaScript for Automation) that provides various utilities and functions to simplify automation tasks on macOS.',
  },
  // TypeScript only
  package_json+: {
    dependencies+: { ramda: utils.latestNpmPackageVersionCaret('ramda') },
    devDependencies+: {
      '@types/ramda': utils.latestNpmPackageVersionCaret('@types/ramda'),
      'globals': utils.latestNpmPackageVersionCaret('globals'),
      'jxa-types': utils.latestNpmPackageVersionCaret('jxa-types'),
    },
    files+: ['dist/**/*.js', 'dist/**/*.d.ts'],
    main: 'dist/index.js',
    types: './dist/',
  },
  eslint+: [{ rules: { '@typescript-eslint/no-unused-expressions': 'off' } }],
  tsconfig+: {
    compilerOptions+: {
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
