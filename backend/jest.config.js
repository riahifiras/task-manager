module.exports = {
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testRegex: '/.*\\.spec\\.ts$',  
    testEnvironment: 'node',
  };
  