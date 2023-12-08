module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['off', 2],
    'no-use-before-define': ['error', { functions: false }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
