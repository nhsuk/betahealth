const eslint = require('gulp-eslint');
const paths = require('../../paths');

module.exports = (gulp) => {
  return gulp.src([
    `${paths.sourceJS}/**/*.js`,
    `${paths.sourceApp}/**/*.js`,
    `${paths.projectDir}/+(config|gulp|lib|public|test)/**/*.js`,
    `${paths.projectDir}/*.js`,
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
};
