/* eslint-disable strict */

'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

// Start a development Node server which will
// autorestart when changes are made to server side code
gulp.task('serve', (cb) => {
  let started = false;

  return nodemon({
    script: 'app.js',
    ext: 'js nunjucks',
    ignore: [
      './assets',
      './tmp',
    ],
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});
