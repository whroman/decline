'use strict';

const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('./dev.webpack.config.js');

webpackConfig.plugins = [
  // new webpack.optimize.UglifyJsPlugin({
    // mangle: false
  // })
  new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
  })
];

module.exports = webpackConfig;