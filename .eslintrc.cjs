/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'espree',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'vue/version': '3',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
    'vue/require-prop-types': 'warn',
    'vue/order-in-components': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['**/tests/unit/**/*.spec.ts', '**/__tests__/**/*.ts', 'src/**/*.spec.ts'],
      env: {
        node: true,
        es2022: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['tests/e2e/**/*.ts'],
      env: {
        node: true,
        es2022: true,
        'cypress/globals': true,
      },
      extends: ['plugin:cypress/recommended'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
  ],
};
