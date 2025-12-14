
export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  extensionsToTreatAsEsm: ['.js'],
  testTimeout: 30000,
  // Use babel-jest for transformation if needed (uncomment if you use Babel)
  // transform: {},
  // globals: { 'ts-jest': { useESM: true } },
};
