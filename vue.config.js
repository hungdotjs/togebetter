const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

let configureWebpack = {};
if (process.env.NODE_ENV === 'development') {
  configureWebpack = { plugins: [new BundleAnalyzerPlugin()] };
}

module.exports = {
  configureWebpack,
};
