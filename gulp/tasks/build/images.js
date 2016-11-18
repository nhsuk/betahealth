const paths = require('../../paths');
const imagemin = require('gulp-imagemin');

module.exports = (gulp) => {
  return gulp.src(`${paths.sourceImages}/**/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.outputImages));
};
