const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/script.js',  // ✅ Frontend entry
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the dist folder before each build
    publicPath: '/', // Ensure assets are served from the root
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "assert": require.resolve("assert/"),
      "vm": require.resolve("vm-browserify"),
      "async_hooks": require.resolve("async-hooks"),
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("stream-http"),
      "querystring": require.resolve("querystring-es3"),
      "net": false,
      "fs": false,
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body', // Inject scripts at the end of the body
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
};
