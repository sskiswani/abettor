import gulp from 'gulp';
import del from 'del';
//~
const electron = require('electron-connect').server.create();
//~
import config from '../config';

gulp.task('serve', () => {
   electron.start();

   gulp.watch('app.js', electron.restart);
   gulp.watch([''], electron.reload);
});
