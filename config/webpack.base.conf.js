var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'StorageManager': './src/StorageManager.js',
        'StorageManager.min': './src/StorageManager.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src')],
                exclude: /node_modules/,
            },
        ],
    },
};
