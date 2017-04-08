const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');

const { makeTaskLogger, logTask } = require('./helpers');
const { src } = require('../config');

const webpackConfig = {
   electron: require('../config/webpack/webpack.electron'),
   client: require('../config/webpack/webpack.client')
};

//~ webpack build for electron app
gulp.task('webpack:electron', (callback) => {
   webpack(webpackConfig.electron, (err, stats) => {
      if (err) { throw new gutil.PluginError('webpack:electron', err); }
      logTask('webpack:electron', stats.toString({
         colors: true,
         chunks: false,
         errorDetails: true
      }));
      callback();
   });
});

//~ webpack build for client app
gulp.task('webpack:client', (callback) => {
   webpack(webpackConfig.client, (err, stats) => {
      if (err) { throw new gutil.PluginError('webpack:client', err); }
      logTask('webpack:client', stats.toString({
         colors: true,
         chunks: false,
         errorDetails: true
      }));
      callback();
   });
});

gulp.task('webpack', ['webpack:electron', 'webpack:client']);

function createDevServerTasks() {
   const devConfig = require('../config/webpack/web.dev.webpack');
   const { devServer } = devConfig;
   const { port, publicPath } = devServer;
   const statsOptions = Object.assign({
      colors: true,
      chunks: false,
      errorDetails: true
   }, devServer.stats);

   //~ create compiler
   const devCompiler = webpack(devConfig);
   let logged = false;
   devCompiler.plugin('done', (stats) => {
      if (!logged) {
         logged = true;
         logTask('webpack:dev-server',
            gutil.colors.bold.underline.cyan(`http://localhost:${port}/`),
            '\n',
            gutil.colors.bold.underline.cyan(publicPath));
      }
      gutil.beep();
   });

   //~ create build task
   gulp.task('webpack:dev', (callback) => {
      devCompiler.run((err, wbStats) => {
         if (err) { throw new gutil.PluginError('webpack:dev', err); }
         logTask('webpack:dev', wbStats.toString(statsOptions));
         callback();
      });
   });

   gulp.task('webpack:dev-server', (callback) => {
      (new WebpackDevServer(devCompiler, { stats: statsOptions }))
         .listen(port, 'localhost', (err) => {
            if (err) { throw new gutil.PluginError('webpack:dev-server', err); }
            // gutil.log('[webpack:dev-server]', `http://localhost:${port}/`);
            // keep the server alive or continue?
            callback();
         });
   });
};

createDevServerTasks();

gulp.task('watch', ['webpack:client:dev'], () => {
   gulp.watch(`${src}/app/**/*`, ['webpack:client:dev']);
});
