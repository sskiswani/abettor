const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const logTask = (taskName, ...messages) => {
   gutil.log(`[${gutil.colors.bold.magenta(taskName)}]`, ...messages);
};

gulp.task('build:client', (callback) => {
   webpack(
      require('../webpack/client.webpack'),
      (err, stats) => {
         if (err) { throw new gutil.PluginError('build:client', err); }
         logTask('build:client', stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
         }));
         callback();
      }
   );
});

(function createClientDevTask() {
   const devConfig = require('../webpack/client.dev.webpack');
   const { devServer } = devConfig;
   const { port, publicPath } = devServer;

   const statsOptions = Object.assign(devServer.stats, {
      colors: true,
      chunks: false,
      errorDetails: true
   });

   //~ create compiler
   const devCompiler = webpack(devConfig);
   let logged = false;
   devCompiler.plugin('done', (stats) => {
      if (!logged) {
         logged = true;
         logTask('webpack:dev-server', gutil.colors.bold.underline.cyan(publicPath));
      }

      gutil.beep();
   });

   //~ create build task
   gulp.task('build:client:dev', (callback) => {
      devCompiler.run((err, wbStats) => {
         if (err) { throw new gutil.PluginError('webpack:dev', err); }
         logTask('webpack:dev', wbStats.toString(statsOptions));
         callback();
      });
   });

   gulp.task('build:client:dev-server', (callback) => {
      (new WebpackDevServer(devCompiler, { stats: statsOptions }))
         .listen(port, 'localhost', (err) => {
            if (err) { throw new gutil.PluginError('webpack:dev-server', err); }
            // keep the server alive or continue?
            callback();
         });
   });
})();

gulp.task('build', ['build:client']);
