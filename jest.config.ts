import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from 'jest';

import { compilerOptions } from './tsconfig.paths.json';

const config: Config = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/shared/lib/testing/fileMock.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  modulePaths: ['<rootDir>/src/'],
  resetMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  coverageDirectory: '.coverage:unit',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!**/node_modules/**',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
  ],
  setupFilesAfterEnv: ['./jest.setup.tsx'],
  fakeTimers: {
    enableGlobally: true,
  },
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
