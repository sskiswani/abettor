const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { absPath, paths } = require('../config');

module.exports = merge(require('./webpack.base'), {
   entry: {
      app: ['babel-polyfill', './src/app/index.ts']
   },

   output: {
      path: absPath('./dist/app')
   },

   devServer: {
      contentBase: [absPath('./dist/app'), absPath('./src/app')],
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
      new CommonsChunkPlugin({
         name: 'vendor',
         minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
      }),
      new ExtractTextPlugin({
         allChunks: true,
         filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
         template: './src/app/index.html',
         inject: 'body',
         hash: true
      })
   ]
});
