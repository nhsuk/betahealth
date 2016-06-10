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
    nhsuk: [
      './assets/javascripts/nhsuk.js',
    ],
    ie: ['JSON2', 'html5shiv'],
  },

  output: {
    path: paths.outputJS,
    filename: '[name].bundle.js',
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
