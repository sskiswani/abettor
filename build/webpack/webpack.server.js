const webpack = require('webpack');
const merge = require('webpack-merge');
const { pkg, absPath } = require('../config');

const deps = Object.keys(pkg.dependencies).concat(Object.keys(pkg.devDependencies));
module.exports = merge(require('./webpack.base'), {
   target: 'electron-main',
   output: {
      path: absPath('dist')
   },
   entry: {
      main: ['./src/index.ts'],
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
