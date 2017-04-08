const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');
const { root, src, dist } = config;
const appSrc = `${src}/app`;
const appDist = `${dist}/app`;

module.exports = {
   cache: true,
   context: root,
   devtool: 'inline-source-map',

   entry: {
      app: ['babel-polyfill', `${appSrc}/index.ts`, `${appSrc}/app.scss`]
   },

   output: {
      chunkFilename: '[chunkhash].js',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      filename: '[name].js',
      path: resolve(root, appDist),
   },

   resolve: {
      extensions: ['.ts', '.js'],
      modules: [resolve(root, appSrc), 'node_modules']
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
            test: /\.ts$/,
            exclude: /(node_modules)/,
            loaders: [
               'babel-loader?cacheDirectory',
               'ts-loader?' + JSON.stringify({ visualStudioErrorFormat: true }),
            ],
         }
      ],
   },

   plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
         }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
      }),
      new ExtractTextPlugin({
         allChunks: true,
         filename: 'style.css'
      }),
      new HtmlWebpackPlugin({
         template: `${appSrc}/index.html`,
         inject: 'body',
         hash: true
      }),
      new CleanWebpackPlugin([appDist], {
         root,
         verbose: false,
      })
   ]
};
