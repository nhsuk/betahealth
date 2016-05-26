const gulp = require('gulp');
const paths = require('../paths');
const browserSync = require('browser-sync').create('bs-proxy');

// This process starts a browser sync instance
// It allows the browser to receive changes in
// real time without having to reload the web page
gulp.task('browserSync', () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: `${paths.outputStyles}/*.css`,
    reloadDelay: 1000,
    port: 3001,
    open: false,
  });
});
