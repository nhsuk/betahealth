/* eslint-disable strict */

'use strict';

const nodemon = require('gulp-nodemon');

// Start a development Node server which will
// autorestart when changes are made to server side code
module.exports = (gulp, done) => {
  let started = false;

  nodemon({
    script: 'app.js',
    ext: 'js nunjucks',
    exec: 'node --debug',
    ignore: [
      './assets',
      './tmp',
      './build',
    ],
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    if (!started) {
      started = true;
      done();
    }
  });
};
