const gulp = require('gulp');
const paths = require('../paths');
const browserSync = require('browser-sync').get('bs-proxy');

// Monitor sass, js and view code for changes and trigger
// rebuilds or refreshes as needed
gulp.task('watch', ['build', 'serve', 'browserSync'], () => {
  gulp.watch(`${paths.sourceJS}/**/*.js`, ['webpack']);
  gulp.watch(`${paths.sourceImages}/**/*`, ['images']);
  gulp.watch(`${paths.sourceStyles}/**/*.scss`, ['css']);
  gulp.watch([
    `${paths.sourceApp}/**/*.js`,
    `${paths.sourceViews}/**/*.nunjucks`,
  ]).on('change', browserSync.reload);
});
