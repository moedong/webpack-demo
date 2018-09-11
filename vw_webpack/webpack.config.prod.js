var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_dir = path.join(__dirname, './node_modules/');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  entry:{}, //对象时，多入口会生成对应的对个js;数组时，只会生成一个main.js
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
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].chunk.css?[hash]'
      })
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
    },
    { 
      test: /\.css$/, 
      //注意，使用ExtractTextPlugin时，css相关的loader配置需要修改成如下
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
                minimize: true
            }
        },'postcss-loader']
      }) 
    },
    //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
    { 
      test: /\.scss$/, 
      loader: 'style!css!sass?sourceMap'
    },
    //.js 文件使用 jsx-loader 来编译处理
 		{ 
      test: /\.js$/, 
      loader: 'jsx-loader?harmony' 
    },
    //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
    { 
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=8192'
    }
  ]
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
      chunks: [name,'vendor'],//在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
      inject: true //所有JavaScript资源插入到body元素的底部
  });
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;