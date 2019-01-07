var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_dir = path.join(__dirname, './node_modules/');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const webpackConfig = {
  entry: {}, //对象时，多入口会生成对应的对个js;数组时，只会生成一个main.js
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[name].bundle.js?[hash]',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      mod: node_dir
    }
  },
  plugins: [
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'css-loader',
        options: {
          minimize: true, // 与项目版本有关，^1.0.0版本无效
          sourceMap: false
        }
      }],
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true']
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].chunk.css?[hash]'
    }),
    new HappyPack({
      id: 'html',
      threadPool: happyThreadPool,
      loaders: ['raw-loader'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery', // 使jquery变成全局变量,不用在自己文件require('jquery')了
      jQuery: 'jquery',
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    // 类库统一打包生成一个文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js',
      minChunks: 3 // 提取使用3次以上的模块，打包到vendor里
    }),
    new UglifyJsPlugin(),
    
  ],
  module: {
    rules: [
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use:'happypack/loader?id=css'
          })
      },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['happypack/loader?id=css', 'happypack/loader?id=scss']
          })
      },
      {
          test: /\.(png|jpg|gif)$/,
          use: ['url-loader?limit=8192&name=images/[name].[ext]?[hash:8]']
      },
      {
          test: /\.(woff|svg|eot|ttf)\??.*$/,
          use: ['url-loader?name=/fonts/[name].[ext]']
      },
      {
        test: /\.html$/,
        use: ['happypack/loader?id=html']
      },
      {
          test: /\.js$/,
          loader: ['happypack/loader?id=js'],
          exclude: '/node_modules/'
      },
      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
  ]
  }
}


var getEntries = function (globPath) {
  var files = glob.sync(globPath);
  var entries = {};
  files.forEach(function (filepath) {
    var split = filepath.split('/');
    var name = split[split.length - 1];
    name = name.replace('\.js', '');
    entries[name] = './' + filepath;
  });
  return entries;
}

var allentry = getEntries('src/js/*.js');

Object.keys(allentry).forEach(function (name) {
  webpackConfig.entry[name] = allentry[name];
  var plugin = new HtmlWebpackPlugin({
    filename: 'pui-' + name + '.html',
    template: './src/html/' + name + '.html',
    chunks: [name, 'vendor'],//在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
    inject: true //所有JavaScript资源插入到body元素的底部
  });
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;