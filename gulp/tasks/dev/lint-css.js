const sassLint = require('gulp-sass-lint');
const stylelint = require('gulp-stylelint');
const paths = require('../../paths');

module.exports = (gulp) => {
  return gulp.src(`${paths.sourceStyles}/**/*.s+(a|c)ss`)
    .pipe(stylelint({
      syntax: 'scss',
      debug: true,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
};
