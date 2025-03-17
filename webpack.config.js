const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './index.js',
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
    })
  ]
};
