'use strict';
const { compilerOptions } = require("./tsconfig.json")
const { pathsToModuleNameMapper } = require("ts-jest/utils")
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
})

module.exports = {
  rootDir: '../',
  transform: {
    "\\.svg": "<rootDir>/svgTransform.js",
    "^.+\\.(tsx?|jsx?)$": `<rootDir>/jest-preprocess.js`,
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  moduleNameMapper: {
    "\\.svg": `<rootDir>/jest-configs/__mocks__/svgTransform.js`,
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/__mocks__/file-mock.js',
    ...paths,
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public'],
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby)/)'
  ],
  globals: {
    __PATH_PREFIX__: '',
    __BASE_PATH__: '',
  },
  setupFiles: ['<rootDir>/jest/loadershim.js']
};
