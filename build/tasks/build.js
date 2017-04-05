const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const config = require('../config');

function createDevBuilder(name, webpackConfig) {
   //~ create a cached compiler
   const compiler = webpack(webpackConfig);

   gulp.task(name, (cb) => {
      compiler.run((err, stats) => {
         if (err) { throw new gutil.PluginError('webpack:electron:dev', err); }
         gutil.log('[webpack:electron:dev]', stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
         }));
         cb();
      });
   });
};

//~ webpack build for electron app
gulp.task('webpack:electron', (cb) => {
   webpack(require('../webpack/webpack.server'), (err, stats) => {
      if (err) { throw new gutil.PluginError('webpack', err); }
      gutil.log('[webpack]', stats.toString({
         colors: true,
         chunks: false,
         errorDetails: true
      }));
      cb();
   });
});


//~ webpack build for client app
gulp.task('webpack:client', (cb) => {
   webpack(require('../webpack/webpack.client'), (err, stats) => {
      if (err) { throw new gutil.PluginError('webpack', err); }
      gutil.log('[webpack]', stats.toString({
         colors: true,
         chunks: false,
         errorDetails: true
      }));
      cb();
   });
});

createDevBuilder('webpack:electron:dev', require('../webpack/webpack.server'));
createDevBuilder('webpack:client:dev', require('../webpack/webpack.client'));

gulp.task('webpack', ['webpack:electron', 'webpack:client']);
