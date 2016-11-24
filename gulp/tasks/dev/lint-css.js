const scsslint = require('gulp-scss-lint');
const paths = require('../../paths');

module.exports = (gulp) => {
  return gulp.src(`${paths.sourceStyles}/**/*.s+(a|c)ss`)
    .pipe(scsslint())
    .pipe(scsslint.failReporter());
};
