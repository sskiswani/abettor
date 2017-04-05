const gulp = require('gulp');

require('./build/tasks');

gulp.task('default', ['clean', 'webpack']);
