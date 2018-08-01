var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  devtool: 'cheap-eval-source-map',
  entry: {},
  output: {
    path: path.resolve(__dirname, 'dist/'),
    //publicPath: './', //devServer环境，不能设置 publicPath
    filename: 'js/[name].bundle.js?[hash]'
  },
  plugins: [
    // 类库统一打包生成一个文件
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'js/vendor.js',
        minChunks: 3 // 提取使用3次以上的模块，打包到vendor里
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].chunk.css?[hash]'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{ 
      test: /\.css$/, 
      //注意，使用ExtractTextPlugin时，css相关的loader配置需要修改成如下
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
                minimize: true
            }
        }]
      }) 
    }, {
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
    }]
  },
  devServer: {
    contentBase: './src',   //监听的目录
    watchContentBase: true, //设置watchContentBase了，不能再设置 hot:'true'
    open:true,
    openPage:'pui-a.html'
  }
}


var getEntries = function(globPath) {
  var files = glob.sync(globPath);
  var entries = {};
  files.forEach(function(filepath) {
      var split = filepath.split('/');
      var name = split[split.length - 1];
      name = name.replace('\.js', '');
      entries[name] = './' + filepath;
  });
  return entries;
}

var allentry = getEntries('src/js/*.js');

Object.keys(allentry).forEach(function(name) {
  webpackConfig.entry[name] = allentry[name];
  var plugin = new HtmlWebpackPlugin({
      filename: 'pui-' + name + '.html',
      template: './src/html/' + name + '.html',
      chunks: [name,'vendor']//在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
  });
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;