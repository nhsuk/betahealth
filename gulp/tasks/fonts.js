const gulp = require('gulp');
const paths = require('../paths');

gulp.task('fonts', () => {
  gulp.src(`${paths.sourceFonts}/**/*`)
    .pipe(gulp.dest(paths.outputFonts));
});
