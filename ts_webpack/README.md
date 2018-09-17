- tsconfig.json

要能在 webpack 里使用 TypeScript，你需要创建 tsconfig.json 文件，这是 TypeScript 编辑器的配置文件；

主要是配置

```javascript
{
  "compilerOptions": {
    "lib": [
      "dom",
      "es5",
      "es2015",
      "es2015.promise"
    ],
    "module": "esnext",
    "moduleResolution": "node",
    "target": "es5",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true
  }
}
```
其中：

> module和moduleResolution表示这是一个 Node.js 项目，使用 CommonJS 模块机制
> target 指定将代码编译到 ES6，如果目标执行系统可能有 Node.js v0.x 的版本，可设置编译到 ES5
> sourceMap 指定编译时生成对应的 SourceMap 文件，这样在调试程序时能快速知道所对应的 TypeScript 源码位置

&nbsp;
&nbsp;


- webpack 配置

具体的配置请看 webpack.config.dev.js 和 webpack.config.prod.js 

&nbsp;
&nbsp;

- 参考

https://github.com/ducksoupdev/vue-webpack-typescript
https://morning.work/page/others/typescript-start-guide-for-nodejs-developer.html