module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-env'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '~src/theme',
      },
    ],
  ],
};
