module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: false,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: ['prettier', 'import'],
  root: true,
  rules: {
    'arrow-body-style': ['error', 'always'],
    'array-callback-return': ['warn'],
    'class-methods-use-this': ['error'],
    'comma-dangle': ['error', 'never'],
    'func-names': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'no-underscore-dangle': ['error', { allow: ['__meta', '__test_only__'] }],
    'no-unneeded-ternary': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'prefer-destructuring': ['error'],
    'prefer-object-spread': ['error'],
    'prettier/prettier': ['error'],
    'require-await': ['warn'],
    'sort-keys': 'off'
  }
};
