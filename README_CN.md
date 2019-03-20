[English](./README.md) | 中文

# eruda-webpack-plugin

[eruda](https://github.com/liriliri/eruda) 的 webpack 插件

## 使用

```js
npm i --save-dev eruda-webpack-plugin
```

```js
// webpack.config.js
const ErudaWebapckPlugin = reuire('eruda-webpack-plugin')
const HtmlWebpackPlutin = require('html-webpack-plugin')

const config = {
  devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 1000
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlutin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new ErudaWebapckPlugin()
  ]
}
```

在浏览器中打开 `http://localhost:1000` 就可以调试你的移动端网页了

<img  width="350" align="center" src="./screenshot.png" />

## 使用 eruda 的插件

```js
new ErudaWebapckPlugin({
  plugins: ['fps', 'timing']
})
```

## Options

### force


`eruda-webpack-plugin` 默认只会在 `development` mode 生效, 如果你在其他 mode 中也想使用，可以设置 `force` 为 `true`

```js
new ErudaWebpackPlugin({
  force: true
})
```

### tool

选择你想要使用的 eruda 的功能，默认会全部加载。

```js
new ErudaWebpackPlugin({
  tool: ['console', 'elements']
})
```

### plugins

添加 eruda 的插件

```js
new ErudaWebapckPlugin({
  plugins: ['fps', 'timing']
})
```

### entry

需要被注入 `eruda` 实例的输出文件

默认所有的 `.js` 文件都会被注入

```js
new ErudaWebpackPlugin({
  entry: [/index\.js$/, /page1\.js$/]
})
```

### filters

不需要注入 `eruda` 实例的输出文件

这个选项和 `entry` 正好相反

```js
new ErudaWebpackPlugin({
  filters: [/subpage\.js$/]
})
```