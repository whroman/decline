'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cwd = process.cwd();
const DIST_PATH = path.join(cwd, 'dist');

const GA_NAMESPACE = 'DECLINE_GOOGLE_ANALYTICS_TOKEN';
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            [GA_NAMESPACE]: JSON.stringify(process.env[GA_NAMESPACE])
        },
    }),
    new ExtractTextPlugin('build.css')
];

module.exports = {
    plugins,
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
                    path.resolve(cwd, 'app'),
                    path.resolve(cwd, 'tables'),
                    path.resolve(cwd, 'generator'),
                    path.resolve(cwd, 'sentenceGenerator'),
                ],
                loader: 'babel',
            },
            {
                test: /\.json$/i,
                loader: 'json'
            },
            {
                test: /\.scss$/i,
                loader: ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap'])
            }
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(cwd, 'node_modules', 'foundation-sites', 'scss'),
            path.resolve(cwd, 'app', 'styling'),
        ]
    },
    resolve: {
        alias: {
            app: path.resolve(cwd, 'app'),
            tables: path.resolve(cwd, 'tables'),
            generator: path.resolve(cwd, 'generator'),
            sentenceGenerator: path.resolve(cwd, 'sentenceGenerator')
        }
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        historyApiFallback: true
    },
};
