const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig');

module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
    coveragePathIgnorePatterns: [
        "/src/app/core/services/app-config/app-config.service.mock.ts",
        "/node_modules/"
    ],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
    coverageDirectory: 'report/coverage',
    testResultsProcessor: 'jest-sonar-reporter',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {},
        {
            prefix: '<rootDir>/'
        }),
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    globalSetup: 'jest-preset-angular/global-setup'
};
