var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackConfig = require('./webpack.test.conf');

module.exports = function(config) {
  config.set({
    basePath: '../src',
    frameworks: ['jasmine'],
    files: ['**/*.js', '**/*.spec.js'],
    exclude: [],
    preprocessors: {
      '**/*.js': ['webpack' ,'sourcemap'],
      '**/*.spec.js': ['webpack']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
  });
};
