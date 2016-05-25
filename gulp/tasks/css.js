const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const paths = require('../paths');

// add extra sass paths
const SASS_PATHS = [];

function buildDevelopmentStyles() {
  return gulp.src(`${paths.sourceStyles}/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: SASS_PATHS,
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.outputStyles}`));
}

function buildProductionStyles() {
  return gulp.src(`${paths.sourceStyles}/*.scss`)
    .pipe(sass({
      includePaths: SASS_PATHS,
      outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9'],
    }))
    .pipe(gulp.dest(`${paths.outputStyles}`));
}

gulp.task('css', () => {
  if (process.env.NODE_ENV === 'production') {
    return buildProductionStyles();
  }
  return buildDevelopmentStyles();
});
