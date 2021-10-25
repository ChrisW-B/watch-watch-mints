// INSTRUCTIONS:
// - use *error*, *warn*, or *off* (no numbers)
// - *off* must only be added when overriding recommended configs
// - *warn* must only be used as a transition to error (if you don't plan on fixing the source, don't add a rule)
// - keep rules in alphabetical order
const path = require('path');

module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.yaml', '*.json', '*.yml', '*.html', '*.js', '*.jsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jsx-a11y', 'styled-components-a11y'],
      extends: [
        '../.eslintrc.js',
        'plugin:styled-components-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: [path.resolve(__dirname, '..', 'tsconfig.json')],
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': 'allow-with-description',
          },
        ],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'off', // would love to make this an error, but gql types are not always correct
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { ignoreRestSiblings: true, argsIgnorePattern: '^_+' },
        ],
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/label-has-associated-control': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@atoms/Button/buttonBase',
                message:
                  'This is a private function for creating buttons, please use another button module',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.gql', '*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      extends: ['../.eslintrc.js'],
      parserOptions: {
        operations: ['./src/**/*.gql'],
      },
      rules: {
        // @graphql-eslint does not have a recommended set yet
        // so this is just a list of all the available rules
        // full list is https://github.com/dotansimha/graphql-eslint/blob/master/docs/README.md
        '@graphql-eslint/avoid-duplicate-fields': 'error',
        // '@graphql-eslint/avoid-operation-name-prefix': 'off', // rule seems buggy
        '@graphql-eslint/description-style': 'error',
        '@graphql-eslint/executable-definitions': 'error',
        '@graphql-eslint/fields-on-correct-type': 'error',
        '@graphql-eslint/fragments-on-composite-type': 'error',
        '@graphql-eslint/input-name': ['error', { checkInputType: true }],
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        // '@graphql-eslint/known-fragment-names': 'off', // doesn't work with imports
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/lone-anonymous-operation': 'error',
        '@graphql-eslint/lone-schema-definition': 'error',
        // '@graphql-eslint/naming-convention': 'off',
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/no-case-insensitive-enum-values-duplicates': 'error',
        '@graphql-eslint/no-deprecated': 'error',
        '@graphql-eslint/no-fragment-cycles': 'error',
        // '@graphql-eslint/no-hashtag-description': 'off', // conflicts with imports
        '@graphql-eslint/no-operation-name-suffix': 'error',
        '@graphql-eslint/no-undefined-variables': 'error',
        '@graphql-eslint/no-unreachable-types': 'error',
        // '@graphql-eslint/no-unused-fragments': 'off',
        '@graphql-eslint/no-unused-variables': 'error',
        '@graphql-eslint/one-field-subscriptions': 'error',
        '@graphql-eslint/overlapping-fields-can-be-merged': 'error',
        '@graphql-eslint/possible-fragment-spread': 'error',
        '@graphql-eslint/possible-type-extension': 'error',
        // '@graphql-eslint/prettier': 'off',
        '@graphql-eslint/provided-required-arguments': 'error',
        '@graphql-eslint/require-deprecation-reason': 'error',
        // '@graphql-eslint/require-description': 'off',
        '@graphql-eslint/require-id-when-available': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
        // '@graphql-eslint/selection-set-depth': 'off',
        '@graphql-eslint/unique-argument-names': 'error',
        '@graphql-eslint/unique-directive-names-per-location': 'error',
        '@graphql-eslint/unique-directive-names': 'error',
        '@graphql-eslint/unique-enum-value-names': 'error',
        '@graphql-eslint/unique-field-definition-names': 'error',
        '@graphql-eslint/unique-fragment-name': 'off',
        '@graphql-eslint/unique-input-field-names': 'error',
        '@graphql-eslint/unique-operation-name': 'error',
        '@graphql-eslint/unique-operation-types': 'error',
        '@graphql-eslint/unique-type-names': 'error',
        '@graphql-eslint/unique-variable-names': 'error',
        '@graphql-eslint/value-literals-of-correct-type': 'error',
        '@graphql-eslint/variables-are-input-types': 'error',
        '@graphql-eslint/variables-in-allowed-position': 'error',
      },
    },
  ],
};
