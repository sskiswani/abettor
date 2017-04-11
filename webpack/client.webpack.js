const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');
const config = require('./config');

const { root, client } = config;
const { src, dist } = client;

let { babelOptions } = config;
babelOptions.plugins = [
   'angularjs-annotate'
];

module.exports = merge.smart(require('./webpack.base'), {
   devtool: 'inline-source-map',
   entry: {
      app: ['babel-polyfill', `${src}/index.ts`]
   },
   output: {
      path: resolve(root, dist)
   },
   module: {
      loaders: [
         { test: /\.(html|jpg|png)$/, loader: 'raw-loader' },
         { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
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
         },
         {
            test: /\.ts(x?)$/,
            exclude: /(node_modules)/,
            use: [
               {
                  loader: 'babel-loader?' + JSON.stringify(babelOptions)
               },
               {
                  loader: 'ts-loader',
                  options: { visualStudioErrorFormat: true }
               }
            ]
         }
      ],
   },
   plugins: [
      new ExtractTextPlugin({
         allChunks: true,
         filename: 'style.css'
      }),
      new HtmlWebpackPlugin({
         template: `${src}/index.html`,
         inject: 'body',
         hash: true
      }),
      new CleanWebpackPlugin([dist], {
         root,
         verbose: false,
      })
   ]
});
