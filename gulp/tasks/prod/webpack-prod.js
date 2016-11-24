const gutil = require('gulp-util');
const webpack = require('webpack');

const paths = require('../../paths');
// eslint-disable-next-line import/no-dynamic-require
const webpackConfig = require(paths.webpackProductionConfig);

module.exports = (gulp, done) => {
  return webpack(webpackConfig).run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false,
    }));

    return done();
  });
};
