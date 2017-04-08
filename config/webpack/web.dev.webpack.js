const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');
const { root, src, dist } = config;
const appDist = `${dist}/app`;

const port = config.port || process.env.port || 9001;
const publicPath = `http://${config.hostname || 'localhost'}:${port}/dist/app`;

module.exports = merge.smartStrategy({ entry: 'prepend' })(
   require('./web.webpack'), {
      entry: {
         app: [
            `webpack-dev-server/client?http://localhost:${port}/`,
            'webpack/hot/only-dev-server'
         ]
      },
      devServer: {
         port,
         publicPath,
         inline: true,
         lazy: false,
         hot: true,
         headers: { 'Access-Control-Allow-Origin': '*' },
         contentBase: resolve(root, appDist),
         watchOptions: {
            aggregateTimeout: 300,
            poll: 100
         },
         historyApiFallback: {
            verbose: true,
            disableDotRule: false,
         },
         stats: {
            colors: true,
            context: resolve(root, src),
            cached: false,
            chunks: false,
            exclude: [/(node_modules)/],
            modules: false,
            children: false,
            hash: false,
            version: false
         },
      },
      plugins: [
         new webpack.WatchIgnorePlugin([appDist]),
         new webpack.HotModuleReplacementPlugin()
      ]
   }
);
