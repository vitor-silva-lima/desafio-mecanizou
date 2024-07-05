/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { '^.+\\.(css|less|gif|jpg|jpeg|svg|png)$': 'module.exports = {};', 'src/(.*)': '<rootDir>/src/$1' },
};

