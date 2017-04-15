// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./config/webpack.prod.conf');

var spinner = ora('building for production...');
spinner.start();

rm('-rf', './dist');
mkdir('./dist');

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})