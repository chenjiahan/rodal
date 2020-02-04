const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './docs/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    publicPath: '/docs/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    contentBase: './docs',
    port: 2345,
    compress: true,
    stats: "errors-only"
  }
};
