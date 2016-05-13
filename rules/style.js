module.exports = {
  'rules': {
    // Style
    'block-spacing': [2, 'always'],
    'brace-style': [2, 'stroustrup', {
      'allowSingleLine': false,
    }],
    'camelcase': [2, {
      'properties': 'always',
    }],
    'consistent-this': [2, '_this'],
    'func-style': [2, 'expression'],
    'indent': [2, 2, {
      'VariableDeclarator': {
        'var': 2,
      },
      'SwitchCase': 2,
    }],
    'linebreak-style': [2, 'unix'],
    'lines-around-comment': [2, {
      'beforeBlockComment': true,
      'beforeLineComment': true,
      'allowBlockStart': true,
      'allowObjectStart': true,
      'allowArrayStart': true,
    }],
    'max-depth': [1, 4],
    'one-var': [2, {
      'var': 'always',
      'let': 'never',
      'const': 'never',
    }],
    'padded-blocks': [2, 'never'],
    'quote-props': [2, 'consistent'],
    'space-before-keywords': [2, 'always'],
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false,
    }],
    'spaced-comment': [2, 'always', {
      'exceptions': ['-', '+', '/', '*'],
      'markers': ['=', '!'],
    }],
  },
};
