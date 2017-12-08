const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/entry/index.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-withimg-loader'
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: './css/fonts/'
        }
      }]
    }, {
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      device: path.resolve(__dirname, 'src/js/index.js')
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};