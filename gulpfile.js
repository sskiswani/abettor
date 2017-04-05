 const gulp = require('gulp');
 const requireDir = require('require-dir');

requireDir('./build/tasks', { recurse: true });

 gulp.task('default', gulp.series('clean', 'webpack'));
