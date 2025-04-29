module.exports = {
  root: true,
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
    '@nuxtjs/eslint-config-typescript',
    './.eslintrc-auto-import.json',
    'plugin:prettier/recommended'
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
    'vue/singleline-html-element-content-newline': 'off',
    'tailwindcss/no-custom-classname': 'off',
    indent: 'off',
    quotes: ['error', 'single'],
    semi: 'off',
    'comma-dangle': ['error', 'never'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': 'off',
    'space-infix-ops': [
      'error',
      {
        int32Hint: false
      }
    ],
    'no-var': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
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
      'warn',
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
    'prefer-regex-literals': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': [
      'error',
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
        semi: false,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: 'always'
      }
    ]
  }
}
