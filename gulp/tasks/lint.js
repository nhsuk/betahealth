const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const paths = require('../paths');

gulp.task('lint-css', () => {
  return gulp.src(`${paths.sourceStyles}/**/*.s+(a|c)ss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('lint-js', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!build/**', '!coverage/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint-css', 'lint-js']);
