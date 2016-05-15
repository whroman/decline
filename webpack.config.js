'use strict';

const path = require('path');
const webpack = require('webpack');

const DIST_PATH = path.join(__dirname, 'dist');

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
          path.resolve(__dirname, "app"),
        ],
        loader: 'babel'
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
    includePaths: [path.resolve(__dirname, "./node_modules/foundation-sites/scss")]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    })
  ],
  devtool: 'source-map',
  devServer: {
    inline: true,
    historyApiFallback: true
  },
  publicPath: null
};
