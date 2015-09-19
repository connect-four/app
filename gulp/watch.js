'use strict';

var gulp = require('gulp');
var paths = gulp.paths;

gulp.task('watch', ['inject'], function () {
    gulp.watch([
        paths.src + '/*.html',
        paths.src + '/{app,components}/**/*.html',
        paths.src + '/{app,componentsm,assets}/**/*.css',
        paths.src + '/{app,components}/**/*.js',
        paths.src + '/{app,components,assets}/**/*.json',
        'bower.json'
    ], ['inject']);
});
