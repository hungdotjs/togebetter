module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'linebreak-style': 'off',
    'arrow-body-style': 'off',
    'operator-linebreak': 'off',
  },
};
