const sassLint = require('gulp-sass-lint');
const paths = require('../../paths');

module.exports = (gulp) => {
  return gulp.src(`${paths.sourceStyles}/**/*.s+(a|c)ss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
};
