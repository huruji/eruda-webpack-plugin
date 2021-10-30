const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),
  ]
}

module.exports = config
