const webpack = require('webpack');
const { resolve } = require('path');
const { root, src, dist, babelOptions } = require('./config');

module.exports = {
   cache: true,
   context: root,
   devtool: 'source-map',

   output: {
      chunkFilename: '[chunkhash].js',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      filename: '[name].js'
   },

   resolve: {
      extensions: ['.ts', '.js'],
      modules: [resolve(root, src), 'node_modules']
   },

   module: {
      loaders: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{ loader: 'babel-loader', options: babelOptions }]
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
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.WatchIgnorePlugin([
         /(dist)/,
         /(node_modules)/
      ]),
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
         }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
      })
   ],
   stats: {
      colors: true
   }
};
