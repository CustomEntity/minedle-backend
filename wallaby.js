module.exports = () => ({
    autoDetect: true,
    files: ['src/**/*.ts', '!src/**/*.test.ts'],
    tests: ['src/**/*.test.ts'],
    testFramework: 'jest',
});