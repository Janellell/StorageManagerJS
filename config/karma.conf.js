var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackConfig = require('./webpack.test.conf');

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: ['src/**/*.js', 'src/**/*.spec.js'],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['webpack' ,'sourcemap'],
      'src/**/*.spec.js': ['webpack'],
    },
    reporters: ['progress', 'coverage', 'coveralls'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    // coverageIstanbulReporter: {
    //   reports: ['lcov', 'text-summary'],
    //   fixWebpackSourcePaths: true,
    // },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
    }
  });
};
