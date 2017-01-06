/* eslint-disable no-param-reassign */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = (function headlessConfig(config) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());

  config.devtool = null;

  return config;
}(webpackConfig));
