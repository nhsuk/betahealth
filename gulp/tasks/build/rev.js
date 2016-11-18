const gulpIgnore = require('gulp-ignore');
const print = require('gulp-print');
const revAll = require('gulp-rev-all');

const paths = require('../../paths');
const config = require('../../../config/config');

module.exports = (gulp, done) => {
  // only revision if on production
  if (config.env !== 'production') {
    return done();
  }

  return gulp.src(`${paths.output}/**/*.*`)
    .pipe(gulpIgnore.exclude('*.map'))
    .pipe(print())
    .pipe(revAll.revision({
      hashLength: 32,
      dontRenameFile: ['rev-manifest.json'],
      includeFilesInManifest: [
        '.css',
        '.js',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.svg',
        '.ico',
        '.eot',
        '.ttf',
        '.woff',
        '.woff2',
      ],
    }))
    .pipe(gulp.dest(paths.build))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(paths.build));
};
