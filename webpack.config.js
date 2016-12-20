var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

var IS_PRODUCTION = process.env.NODE_ENV === 'production';

var ENTRY_POINTS = [
  './src/EntryScene.js'
];

if (IS_PRODUCTION) {
  // Uglify in production.
  PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          except: ['$super', '$', 'exports', 'require']
      },
      sourcemap: false
    })
  );
}

module.exports = {
  entry: ENTRY_POINTS,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: 'bundle.js',
    path: './build',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        // JS.
        exclude: /(node_modules)/,
        loader: 'babel',
        test: /\.js$/,
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: [
      'src/js',
      'node_modules',
    ]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  },
  devtool: 'source-map'
};