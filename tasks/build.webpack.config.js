'use strict';

const webpack = require('webpack');

const webpackConfig = require('./dev.webpack.config.js');

webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

module.exports = webpackConfig;