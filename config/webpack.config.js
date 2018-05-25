const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// Base source paths
const PATHS = require('./paths');


module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    app: path.resolve(PATHS.ROOT, 'check.js'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([PATHS.DIST]),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  output: {
    filename: 'check.js',
    path: PATHS.DIST,
  }
};