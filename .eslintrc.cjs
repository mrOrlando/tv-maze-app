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
      files: ['**/tests/unit/**/*.spec.js', '**/__tests__/**/*.js', 'src/**/*.spec.js'],
      env: {
        node: true,
        es2022: true,
      },
    },
  ],
};
