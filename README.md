## demo1：multiple-pages

- multiple-pages

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

- [查看具体的配置](./MultiPage/README.md)

&nbsp;
&nbsp;

## demo2：基于vw的移动适配方案

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

- [查看具体的配置](./vw_webpack/README.md)

## demo3: minipack

实现一个简易的 webpack

- [查看具体的配置](./minipack/README.md)