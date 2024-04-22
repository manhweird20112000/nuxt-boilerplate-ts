module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "tailwindcss/no-custom-classname": 0,
    indent: ["error", 2],
    "linebreak-style": ["error", "window"],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "comma-dangle": ["error"],
    "object-curly-spacing": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "space-infix-ops": [
      "error",
      {
        int32Hint: false,
      },
    ],
    "no-var": "error",
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-empty-pattern": 2,
    "vue/multi-word-component-names": 0,
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "ignore",
        multiline: "below",
      },
    ],
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/ban-types": "error",
    "dot-notation": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "{vue,vue-router,vite,@vitejs/plugin-vue}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@src/**",
            group: "parent",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
        fixStyle: "separate-type-imports",
      },
    ],
    "prefer-regex-literals": 0,
  },
};
