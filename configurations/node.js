module.exports = {
  extends: [
    'defaults/configurations/airbnb/es6',
    'punchcard/rules/best-practices',
    'punchcard/rules/style',
    'punchcard/rules/node',
  ],
  parserOptions: {
    sourceType: 'script',
  },
  env: {
    browser: false,
    node: true,
    amd: false,
    mocha: false,
    jasmine: false,
  },
};
