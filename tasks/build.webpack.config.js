'use strict';

const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('./dev.webpack.config.js');

webpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
];

module.exports = webpackConfig;