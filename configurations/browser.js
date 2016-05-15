module.exports = {
  'extends': [
    'defaults/configurations/airbnb/es5',
    'punchcard/rules/best-practices',
    'punchcard/rules/style',
    'punchcard/rules/browser',
  ],
  'env': {
    'browser': true,
    'node': false,
    'amd': false,
    'mocha': false,
    'jasmine': false,
  },
};
