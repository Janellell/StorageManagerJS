var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');

var webpackConfig = merge(baseConfig, {
  devtool: 'inline-source-map',
});

// no need for entry point during tests
delete webpackConfig.entry;

// User babel for test files
webpackConfig.module.loaders.some(function (loader, i) {
  if (/^babel(-loader)?$/.test(loader.loader)) {
    loader.include.push(path.resolve(__dirname, 'src/**/*.spec.js'));
    return true;
  }
});

module.exports = webpackConfig;