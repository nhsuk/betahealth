const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
// const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const paths = require('../paths');
const isProduction = process.env.NODE_ENV === 'production';

// add extra sass paths
const SASS_PATHS = [
  `${paths.nodeModules}`,
];

gulp.task('css', () => {
  return gulp.src(`${paths.sourceStyles}/*.scss`)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass({
      includePaths: SASS_PATHS,
      outputStyle: isProduction ? 'compressed' : 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0%', 'IE 8'],
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(`${paths.outputStyles}`));
});
