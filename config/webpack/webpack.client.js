const { resolve } = require('path');
const { env } = require('process');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { root, src, dist } = require('../config');

const appSrc = `${src}/app`;
const appDist = `${dist}/app`;

module.exports = merge.smart(require('./webpack.base'), {
   target: 'electron-renderer',
   entry: {
      vendor: ['jquery', 'bootstrap'],
      app: ['babel-polyfill', `${appSrc}/index.ts`, `${appSrc}/app.scss`]
   },
   output: {
      path: resolve(root, appDist)
   },
   devServer: {
      contentBase: [resolve(root, appDist), resolve(root, appSrc)],
      historyApiFallback: true,
      port: 9000,
   },
   module: {
      loaders: [
         {
            test: /\.(scss|sass)$/,
            loader: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: [
                  {
                     loader: 'css-loader',
                     options: { sourceMap: true },
                  },
                  {
                     loader: 'sass-loader',
                     options: { sourceMap: true },
                  },
               ],
            }),
         }
      ]
   },
   plugins: [
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
      }),
      new ExtractTextPlugin({
         allChunks: true,
         filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
         template: `${appSrc}/index.html`,
         inject: 'body',
         hash: true
      })
   ]
});
