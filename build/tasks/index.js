const gulp = require('gulp');
const del = require('del');

const config = require('../config');
import { relPath } from '../config';

require('./build');

gulp.task('clean:app', () => del(relPath('./dist/app')));
gulp.task('clean', () => del(relPath('./dist')));
