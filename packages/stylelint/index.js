const stylelintConfig = {
  extends: ['stylelint-config-standard-scss'],
  customSyntax: 'postcss-styled-syntax',
  rules: {
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    'keyframes-name-pattern': null,
    'no-descending-specificity': null,
    'no-eol-whitespace': null,
    'selector-class-pattern': null,
    'string-quotes': null,
    'value-no-vendor-prefix': null,
    'selector-type-case': [
      'lower',
      {
        ignoreTypes: ['/^\\$\\w+/'],
      },
    ],
    'selector-type-no-unknown': [true, { ignoreTypes: ['/-styled-mixin/', '/^\\$\\w+/'] }],
    'value-keyword-case': [
      'lower',
      {
        ignoreKeywords: ['dummyValue'],
      },
    ],
  },
};

module.exports = stylelintConfig;
