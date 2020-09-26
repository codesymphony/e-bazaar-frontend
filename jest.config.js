/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  rootDir: 'src',
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  verbose: true,
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|png)$': '<rootDir>/__tests__/__mocks__/fileMock.ts',
    '\\.(css|sass)$': '<rootDir>/__tests__/__mocks__/styleMock.ts',
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  globals: {
    'ts-jest': {
      babelConfig: 'babel.config.js',
    },
  },
  automock: false,
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupJest.ts'],
  testRegex: '(/<rootDir>/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  // transformIgnorePatterns: [
  //   'node_modules/react-toastify/dist/ReactToastify.css',
  // ],
};
