// Jest configuration file
//
// https://jestjs.io/docs/en/configuration.html
//

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/__tests__/**', '!src/**/__functionaltests__/**'],
  coverageReporters: ['text', 'html'],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 80,
      statements: -10,
    },
  },
  coveragePathIgnorePatterns: [],
  globals: {
    'ts-jest': {
      isolatedModules: false,
      tsconfig: 'tsconfig.jest.json',
    },
  },
  preset: 'ts-jest/presets/js-with-ts',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Unit tests report',
        outputPath: './reports/units/index.html',
        // we need external styles as Jenkins' default CSP policy
        // prevents inline styles
        // https://wiki.jenkins.io/display/JENKINS/Configuring+Content+Security+Policy#ConfiguringContentSecurityPolicy-TheDefaultRuleSet
        styleOverridePath: './style.css',
        useCssFile: true,
      },
    ],
  ],
  silent: true,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*+(spec|test).[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
