import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
//~
const electron = require('electron-connect').server.create();
//~
import config from '../config';

gulp.task('serve', () => {
   electron.start();
   gulp.watch('app.js', electron.restart);
   gulp.watch([''], electron.reload);
});

/** webpack build for electron app **/
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

/** webpack build for client app**/
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

gulp.task('webpack', gulp.parallel('webpack:electron', 'webpack:client'));
