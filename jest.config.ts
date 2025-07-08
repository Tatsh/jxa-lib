import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

export default {
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!ramda)/es/.*'],
  transform: {
    '^.+\\.js?$': ['ts-jest', {}],
    ...createDefaultPreset().transform,
  },
} as Config;
