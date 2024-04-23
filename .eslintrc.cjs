module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    '@nuxtjs/eslint-config-typescript',
    './.eslintrc-auto-import.json'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'vue/block-order': [
      'error',
      {
        order: ['script:not([setup])', 'script[setup]', 'script[lang=ts]', 'template']
      }
    ],
    'tailwindcss/no-custom-classname': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: 0,
    'comma-dangle': ['error', 'never'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'space-infix-ops': [
      'error',
      {
        int32Hint: false
      }
    ],
    'no-var': 'error',
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'vue/multi-word-component-names': 0,
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below'
      }
    ],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/ban-types': 'error',
    'dot-notation': 'off',
    'import/no-unresolved': 'error',
    'import/namespace': ['error', { allowComputed: true }],
    'import/order': [
      1,
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{vue,vue-router,vite,@vitejs/plugin-vue}',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: '@src/**',
            group: 'parent',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'separate-type-imports'
      }
    ],
    'prefer-regex-literals': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-explicit-any': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        semi: false
      }
    ]
  }
}
