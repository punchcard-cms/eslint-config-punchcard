module.exports = {
  extends: [
    'defaults/configurations/airbnb/es6',
    'punchcard/rules/best-practices',
    'punchcard/rules/style',
    'punchcard/rules/node',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
  },
  env: {
    browser: false,
    node: true,
    es6: true,
    amd: false,
    mocha: false,
    jasmine: false,
  },
};
