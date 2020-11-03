const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer:  {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000
  },
  module: {
    rules: [{
      test: /\.(png|jpg|mp3)$/,
      use: {
        loader: 'file-loader',
      }
    }]
  }
};

module.exports = config;