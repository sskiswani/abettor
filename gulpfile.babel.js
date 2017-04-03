import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import del from 'del';
import requireDir from 'require-dir';
import yargs from 'yargs';
//~
const config = require('./build/config');
const builds = require('./build/webpack');

export const tasks = requireDir('./build/tasks', {
   recurse: true
});

gulp.task('webpack:electron', (cb) => {
   webpack(require('./build/webpack/webpack.server'), (err, stats) => {
      if (err) { throw new gutil.PluginError('webpack', err); }

      gutil.log('[webpack]', stats.toString({
         colors: true,
         chunks: false,
         errorDetails: true
      }));

      cb();
   });
});

gulp.task('webpack:client', (cb) => {
   webpack(require('./build/webpack/webpack.client'), (err, stats) => {
      if (err) { throw new gutil.PluginError('webpack', err); }

      gutil.log('[webpack]', stats.toString({
         colors: true,
         chunks: false,
         errorDetails: true
      }));

      cb();
   });
});

exports.webpack = gulp.parallel('webpack:electron', 'webpack:client');
export default gulp.task('rebuild', gulp.series('clean', 'webpack:electron'));
