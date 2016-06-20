const gulp = require('gulp');
const del = require('del');
const paths = require('../paths');

// Cleans out any generated assets before rebuilding
gulp.task('clean', () => {
  return del([
    paths.build,
    paths.output,
  ]);
});
