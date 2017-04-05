const gulp = require('gulp');
const del = require('del');
const { dist } = require('../config');

gulp.task('clean:app', () => del(`${dist}/app`));
gulp.task('clean', () => del(dist));
