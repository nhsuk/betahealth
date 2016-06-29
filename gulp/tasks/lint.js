const gulp = require('gulp');
const scsslint = require('gulp-scss-lint');
const eslint = require('gulp-eslint');
const paths = require('../paths');

gulp.task('lint-css', () => {
  return gulp.src(`${paths.sourceStyles}/**/*.s+(a|c)ss`)
    .pipe(scsslint())
    .pipe(scsslint.failReporter());
});

gulp.task('lint-js', () => {
  return gulp.src([
    `${paths.sourceJS}/**/*.js`,
    `${paths.sourceApp}/**/*.js`,
    `${paths.projectDir}/+(config|gulp|lib|public|test)/**/*.js`,
    `${paths.projectDir}/*.js`,
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint-css', 'lint-js']);
