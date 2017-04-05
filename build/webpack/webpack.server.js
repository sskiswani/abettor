const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { root, src, dist } = require('../config');

module.exports = merge(require('./webpack.base'), {
   target: 'electron-main',
   output: {
      path: resolve(root, dist)
   },
   entry: {
      main: [`${src}/index.ts`],
   },
   externals: [
      (context, request, callback) => {
         if (request && request.indexOf('node_modules') > 0) {
            return callback(null, 'commonjs ' + request);
         }
         callback();
      }
   ]
});
