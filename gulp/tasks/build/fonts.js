const paths = require('../../paths');

module.exports = (gulp) => {
  return gulp.src(`${paths.sourceFonts}/**/*`)
    .pipe(gulp.dest(paths.outputFonts));
};
