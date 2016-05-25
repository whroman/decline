'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const cwd = process.cwd();
const DIST_PATH = path.join(cwd, 'dist');

module.exports = {
  entry: './app/index',
  output: {
    path: DIST_PATH,
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(cwd, "app"),
          path.resolve(cwd, "src"),
          path.resolve(cwd, "tables")
        ],
        loader: 'babel',
      },
      {
        test: /\.json$/i,
        loader: 'json'
      },
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract(["css?sourceMap", "sass?sourceMap"])
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(cwd, "./node_modules/foundation-sites/scss"),
      path.resolve(cwd, "./app/styling"),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
    }),
    new ExtractTextPlugin('build.css')
  ],
  devtool: 'source-map',
  devServer: {
    inline: true,
    historyApiFallback: true
  },
};
