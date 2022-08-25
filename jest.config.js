const { defaults } = require("jest-config");
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  preset: "ts-jest",
  moduleDirectories: ["node_modules"],
  // transform: {
  //   // "\\.tsx?$": "ts-jest",
  //   "^.+\\.(t|j)sx?$": "ts-jest",
  // },
  moduleNameMapper: {
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$"],
  testEnvironment: "jsdom",
};
