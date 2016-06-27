'use strict';

var gulp = require('gulp');

require('requiredir')('./gulp');

gulp.task('default', function () {
  gulp.start('build');
});
