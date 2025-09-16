/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    "\\.(css|less|scss)$": "identity-obj-proxy",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
  },

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

  transformIgnorePatterns: ["/node_modules/(?!axios)/"],
};

export default config;
