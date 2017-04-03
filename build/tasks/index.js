import gulp from 'gulp';
import del from 'del';
import config from '../config';

import { relPath } from '../config';

gulp.task('clean:app', () => del(relPath('./dist/app')));
export default gulp.task('clean', () => del(relPath('./dist')));
