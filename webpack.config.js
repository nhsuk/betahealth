const webpack = require('webpack');
const paths = require('./gulp/paths');

module.exports = {
  entry: {
    nhsuk: [
      './assets/javascripts/vendor/polyfills/details.polyfill.js',
      './assets/javascripts/nhsuk.js',
    ],
    webtrends: [
      './assets/javascripts/vendor/webtrends/webtrends.js',
    ],
    picturefill: ['picturefill'],
    ie: ['JSON2', 'html5shiv'],
  },

  output: {
    path: paths.outputJS,
    filename: '[name].bundle.js',
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|components|vendor)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        include: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
};
