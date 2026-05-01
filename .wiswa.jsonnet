local utils = import 'utils.libjsonnet';

{
  uses_user_defaults: true,
  project_type: 'typescript',
  project_name: 'jxa-lib',
  version: '0.1.9',
  description: 'General library for AppleScript (JXA).',
  keywords: ['applescript', 'jxa', 'macos', 'typescript'],
  want_main: false,
  // TypeScript only
  package_json+: {
    dependencies+: { ramda: utils.latestNpmPackageVersionCaret('ramda') },
    devDependencies+: {
      // Pin to 5.x until ts-jest and typescript-eslint support TypeScript 6
      typescript: '^5.9.3',
      '@types/ramda': utils.latestNpmPackageVersionCaret('@types/ramda'),
      globals: utils.latestNpmPackageVersionCaret('globals'),
      'jxa-types': utils.latestNpmPackageVersionCaret('jxa-types'),
    },
    files+: ['dist/**/*.js', 'dist/**/*.d.ts'],
    main: 'dist/index.js',
    types: './dist/',
  },
  eslint+: [{ rules: { '@typescript-eslint/no-unused-expressions': 'off' } }],
  github+: {
    // Keep TypeScript on 5.x until ts-jest and typescript-eslint support TypeScript 6
    dependabot+: {
      updates: [super.updates[0] {
        ignore: [{ 'dependency-name': 'typescript', versions: ['>=6.0.0'] }],
      }] + super.updates[1:],
    },
  },
  tsconfig+: {
    compilerOptions+: {
      // Pin to commonjs/node until ts-jest and typescript-eslint support TypeScript 6
      module: 'commonjs',
      moduleResolution: 'node',
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
