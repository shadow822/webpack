const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
module.exports = merge(common, {
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: './images/'
        }
      }]
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            importLoaders: 2
          }
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'stylus-loader'
        }]
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new ExtractTextPlugin('css/[name].css'),
    new uglify()
  ],
  output: {
    publicPath: 'http://192.168.1.7:8080/'
  }
});