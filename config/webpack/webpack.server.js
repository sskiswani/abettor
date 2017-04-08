const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { root, src, dist } = require('../config');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = merge(require('./webpack.base'), {
   target: 'electron-main',
   entry: {
      main: [`${src}/index.ts`],
   },
   output: {
      path: resolve(root, dist)
   },
   externals: [
      (context, request, callback) => {
         if (request && request.indexOf('node_modules') > 0) {
            return callback(null, 'commonjs ' + request);
         }
         callback();
      }
   ],
   plugins: [
      new webpack.IgnorePlugin(/^(spawn-sync|bufferutil|utf-8-validate)$/),
      // Electron uses package.json to find name and version
      new CopyPlugin([{
         from: resolve(root, './package.json')
      }])
   ]
});
