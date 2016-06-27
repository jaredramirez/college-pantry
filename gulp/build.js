'use strict';

var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');

gulp.task('clean', function (cb) {
  del(['build']);
  cb();
});

gulp.task('copy', function() {
    gulp.src(['www/**/*.*']).pipe(gulp.dest('build/'));
});

gulp.task('inject:css', function() {
  return gulp.src('build/index.html')
    .pipe(inject(gulp.src(['!www/lib/**/*.*', 'www/**/*.css'], {read: false}), {relative: true} ))
    .pipe(gulp.dest('build/'));
});

gulp.task('inject:js', function() {
  return gulp.src('build/index.html')
    .pipe(inject(gulp.src(['!www/lib/**/*.*', 'www/**/*.js'], {read: false}), {relative: true}))
    .pipe(gulp.dest('build/'));
});

gulp.task('inject:bower', function() {
  return gulp.src('build/index.html')
    .pipe(inject(gulp.src(mainBowerFiles(), {read: false, base: 'bower_components'}), {name: 'bower', relative: true}))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', function (cb) {
  runSequence('clean', ['copy', 'inject:css', 'inject:js', 'inject:bower'], cb);
});
