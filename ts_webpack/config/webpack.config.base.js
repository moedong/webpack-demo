var path = require('path')
const helpers = require('./helpers')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let config = {
  entry: {},
  output: {
    path: path.resolve(__dirname, 'dist/'),
    //publicPath: './', //devServer环境，不能设置 publicPath
    filename: 'js/[name].bundle.js?[hash]'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {}
  },
  module: {
    rules: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    }
    ]
  },
  plugins: [
    new NamedModulesPlugin(),
    // new CopyWebpackPlugin([{
    //   from: 'src/assets',
    //   to: './assets'
    // } ])
  ]
}

module.exports = config
