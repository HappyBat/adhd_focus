const webpack = require('webpack');
const path = require('path');
const port = process.env.PORT || 8010;

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
    port: port
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