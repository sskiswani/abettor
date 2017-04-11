const gulp = require('gulp');
const del = require('del');
const { dist, client, desktop, server } = require('../webpack/config');

gulp.task('clean:client', () => del(client.dist));
gulp.task('clean:desktop', () => del(desktop.dist));
gulp.task('clean:server', () => del(server.dist));
gulp.task('clean', () => del(dist));
