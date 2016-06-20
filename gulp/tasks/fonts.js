const gulp = require('gulp');
const paths = require('../paths');

gulp.task('fonts', () => {
  return gulp.src(`${paths.sourceFonts}/**/*`)
    .pipe(gulp.dest(paths.outputFonts));
});
