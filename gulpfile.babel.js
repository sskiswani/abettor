import gulp from 'gulp';
import requireDir from 'require-dir';
// import yargs from 'yargs';

requireDir('./build/tasks', { recurse: true });

export default gulp.task('rebuild', gulp.series('clean', 'webpack'));
