module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/*.test.+(ts|tsx|js)"
  ],
  testPathIgnorePatterns: [
    "/node_modules",
    "/dist",
    "/e2e"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};
