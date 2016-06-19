'use strict';

const webpack = require('webpack');

const webpackConfig = require('./dev.webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GA_NAMESPACE = 'DECLINE_GOOGLE_ANALYTICS_TOKEN';
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': '"production"',
            [GA_NAMESPACE]: JSON.stringify(process.env[GA_NAMESPACE])
        },
    }),
    new ExtractTextPlugin('build.css'),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
];

Object.assign(webpackConfig, { plugins });

module.exports = webpackConfig;