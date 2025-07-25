local utils = import 'utils.libjsonnet';

(import 'defaults.libjsonnet') + {
  local top = self,
  // General settings
  project_type: 'typescript',

  // Shared
  github_username: 'Tatsh',
  security_policy_supported_versions: { '0.0.x': ':white_check_mark:' },
  authors: [
    {
      'family-names': 'Udvare',
      'given-names': 'Andrew',
      email: 'audvare@gmail.com',
      name: '%s %s' % [self['given-names'], self['family-names']],
    },
  ],
  project_name: 'jxa-lib',
  version: '0.1.7',
  description: 'General library for AppleScript (JXA).',
  keywords: ['applescript', 'jxa', 'macos', 'typescript'],
  want_main: false,
  copilot: {
    intro: 'jxa-lib is a library for JXA (JavaScript for Automation) that provides various utilities and functions to simplify automation tasks on macOS.',
  },
  social+: {
    mastodon+: { id: '109370961877277568' },
  },

  // GitHub
  github+: {
    funding+: {
      ko_fi: 'tatsh2',
      liberapay: 'tatsh2',
      patreon: 'tatsh2',
    },
  },

  // TypeScript only
  package_json+: {
    dependencies+: { ramda: '^0.31.3' },
    devDependencies+: {
      '@types/ramda': '^0.30.2',
      'jxa-types': '^0.0.5',
      'ts-jest': '^29.4.0',
      'ts-node': '^10.9.2',
      '@types/node': '^24.0.11',
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
