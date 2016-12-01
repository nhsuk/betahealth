const gulpSequence = require('gulp-sequence');
const config = require('../../../config/config');

const webpackTask = config.env === 'production' ? 'webpack-prod' : 'webpack-dev';

module.exports = (gulp, done) => {
  return gulpSequence('clean', ['css', 'images', 'fonts', webpackTask], 'rev', done);
};
