const webpack = require('webpack');
const paths = require('./gulp/paths');
const config = require('./config/config');

const isProduction = config.env === 'production';
const plugins = [
  new webpack.optimize.DedupePlugin(),
];

// production only plugins
if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: {
    index: [
      './assets/javascripts/nhsuk.js',
    ],
  },

  output: {
    path: paths.outputJS,
    filename: 'nhsuk.bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|public\/components/,
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

  plugins,
};
