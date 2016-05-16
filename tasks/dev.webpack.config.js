'use strict';

const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

const DIST_PATH = path.join(cwd, 'dist');

module.exports = {
  entry: './app/index',
  output: {
    path: DIST_PATH,
    publicPath: 'dist/',
    filename: 'application.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(cwd, "app"),
          path.resolve(cwd, "src"),
          path.resolve(cwd, "fixtures")
        ],
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(cwd, "./node_modules/foundation-sites/scss"),
      path.resolve(cwd, "./app/styling"),
    ]
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    historyApiFallback: true
  },
};
