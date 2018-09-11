webpack多入口项目开发及打包的demo

- PostCSS在webpack中的配置

webpack.base.conf.js

```
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
},
```

postcss-loader默认会去查找一个配置文件postcss.config.js，然后需要新建一个postcss.config.js文件。统一管理插件需要把之前安装的包放到plugins里面，并且采用默认配置，默认配置就是每个插件的value值为空对象，不使用某个插件就是false，没有在配置文件里声明的插件是不会生效的，所以配置文件很重要，每个插件也可以定义option，关于插件的option配置需要查询每个插件自定义的配置，关于配置文件说明请看postcss-load-config


postcss.config.js

```
module.exports = {
  parser: false,
  map: false,
  from: '',
  to: '',
  plugins: {
    "postcss-import": {},
    "postcss-simple-vars": {},
    "postcss-extend": {},
    "postcss-nested": {},
    "postcss-preset-env": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
        utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
        viewportWidth: 750,     // (Number) The width of the viewport.
        viewportHeight: 1334,    // (Number) The height of the viewport.
        unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw',     // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
        mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
    },
    "postcss-viewport-units":{},
  }
}
```