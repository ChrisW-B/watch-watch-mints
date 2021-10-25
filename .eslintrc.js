// INSTRUCTIONS:
// - use *error*, *warn*, or *off* (no numbers)
// - *off* must only be added when overriding recommended configs
// - *warn* must only be used as a transition to error (if you don't plan on fixing the source, don't add a rule)
// - keep rules in alphabetical order

module.exports = {
  plugins: ['import', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:json/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  settings: { 'import/resolver': 'webpack', react: { version: 'detect' } },
  env: { es2020: true, browser: true },
  rules: {
    'import/no-anonymous-default-export': 'error',
    'no-console': 'warn',
    'no-duplicate-imports': 'error',
    'no-prototype-builtins': 'off',
    'no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_+' }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
  },
};
