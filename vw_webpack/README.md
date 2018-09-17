## 基于vw的移动适配方案

- 基本概念

在CSS Values and Units Module Level 3中和Viewport相关的单位有四个，分别为vw、vh、vmin和vmax。

vw：是Viewport’s width的简写,1vw等于window.innerWidth的1%  
vh：和vw类似，是Viewport’s height的简写，1vh等于window.innerHeihgt的1%  
vmin：vmin的值是当前vw和vh中较小的值  
vmax：vmax的值是当前vw和vh中较大的值  
vmin和vmax是根据Viewport中长度偏大的那个维度值计算出来的，如果window.innerHeight > window.innerWidth则vmin取百分之一的window.innerWidth，vmax取百分之一的window.innerHeight计算。  


目前出视觉设计稿，我们都是使用750px宽度的，从上面的原理来看，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。我们可以使用PostCSS的插件postcss-px-to-viewport，让我们可以直接在代码中写px，打包时可用这个工具来将px转成vw。

在实际使用的时候，你可以对该插件进行相关的参数配置：

```
"postcss-px-to-viewport": {
    viewportWidth: 750,
    viewportHeight: 1334,
    unitPrecision: 5,
    viewportUnit: 'vw',
    selectorBlackList: [],
    minPixelValue: 1,
    mediaQuery: false
}
```

那么在哪些地方可以使用vw来适配我们的页面。根据相关的测试：

> 容器适配，可以使用vw
> 文本的适配，可以使用vw
> 大于1px的边框、圆角、阴影都可以使用vw
> 内距和外距，可以使用vw


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