const { resolve } = require('path');
const webpack = require('webpack');
const { root, src, dist } = require('../config');

module.exports = {
   context: root,
   devtool: 'source-map',
   output: {
      chunkFilename: '[chunkhash].js',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      filename: '[name].js'
   },
   resolve: {
      extensions: ['.ts', '.js', 'css'],
      modules: [resolve(root, src), 'node_modules']
   },
   module: {
      loaders: [
         { test: /\.html$/, loader: 'raw-loader' },
         {
            test: /\.tsx?$/,
            exclude: /(node_modules)/,
            loaders: [
               'babel-loader?cacheDirectory',
               'ts-loader?' + JSON.stringify({ visualStudioErrorFormat: true }),
            ],
         },
      ],
   },
   plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.WatchIgnorePlugin([
         dist,
         /(node_modules)/
      ])
   ],
   stats: {
      colors: true
   }
};
