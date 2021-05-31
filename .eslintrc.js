module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    `eslint:recommended`,
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
    `prettier/@typescript-eslint`,
    `plugin:prettier/recommended`,
  ],
  plugins: [`@typescript-eslint`, `prettier`, `react`, `emotion`, `react-hooks`,  'graphql'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: `module`, // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    '@typescript-eslint/explicit-function-return-type': 'off',
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    quotes: `off`,
    "@typescript-eslint/quotes": [
      2,
      `backtick`,
      {
        avoidEscape: true,
      },
    ],
    indent: [`error`, 2, { SwitchCase: 1 }],
    "prettier/prettier": [
      `error`,
      {
        trailingComma: `es5`,
        semi: false,
        singleQuote: false,
        printWidth: 120,
        endOfLine: `auto`,
      },
    ],
    'graphql/template-strings': ['error', {
      env: 'relay',
      tagName: 'graphql',
      schemaJsonFilepath: path.resolve(__dirname, 'src/__generated__gatsby-introspection.json'),
    }],
  },
  overrides: [
    // Override some TypeScript rules just for .js files
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off' //
      }
    }
  ]
}
