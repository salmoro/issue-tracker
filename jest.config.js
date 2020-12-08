module.exports = {
    moduleNameMapper: {
        '@core/(.*)': '<rootDir>/src/app/core/$1',
    },
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transformIgnorePatterns: [
        "node_modules/(?!@ngrx)"
    ],
    transform: {
        '^.+\\.(ts|js|html)$': 'ts-jest',
    },
};
