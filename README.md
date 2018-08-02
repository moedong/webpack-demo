webpack多入口项目开发及打包的demo

- HTML hot reload

主要是配置

```javascript
......
devServer: {
  contentBase: './src',   //监听的目录
  watchContentBase: true, //设置watchContentBase了，不能再设置 hot:'true'
  open:true, //打开启动页面 
  openPage:'pui-a.html' //设置启动页面
}

```
&nbsp;
&nbsp;

- 具体的配置请看 webpack.config.dev.js 和 webpack.config.prod.js 

&nbsp;
&nbsp;

- 参考

https://github.com/jantimon/html-webpack-plugin/issues/100  

https://github.com/moedong/webpack-MultiplePage  
 
https://webpack.docschina.org/plugins/commons-chunk-plugin

https://github.com/teabyii/webpack-examples/blob/master/optimize/webpack.config.js