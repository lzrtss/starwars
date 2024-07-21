const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/*.{js,jsx,ts,tsx}',
    'hooks/*.{js,jsx,ts,tsx}',
    'lib/*.{js,jsx,ts,tsx}',
    'services/api.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
};

module.exports = createJestConfig(config);
