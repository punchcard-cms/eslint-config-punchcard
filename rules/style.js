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
    'keyword-spacing': [2, {
      'before': true,
      'after': true,
    }],
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false,
    }],
    'spaced-comment': [2, 'always', {
      'exceptions': ['-', '+', '/', '*'],
      'markers': ['=', '!'],
    }],
    'arrow-body-style': [2, 'always'],
    'max-len': 0,
    'newline-before-return': 2,
    'object-property-newline': 2,
    'valid-jsdoc': [2, {
      'prefer': {
        'return': 'returns',
      },
      'requireReturn': false,
      'preferType': {
        'String': 'string',
        'Object': 'object',
        'Array': 'array',
      },
    }],
  },
};
