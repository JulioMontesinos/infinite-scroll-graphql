import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // Automatic Mock for CSS
    "\\.svg$": "<rootDir>/jest.fileMock.js", // Generic Mock for SVGs
  },
};

export default config;