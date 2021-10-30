const { merge } = require('webpack-merge')

const ErudaHtmlPlugin = require('../../lib/plugin')

const cleanConfig = require('../boilerplate/webpack.config.js')
const contextConfig = require('./context')

module.exports = merge(
  cleanConfig,
  contextConfig,
  {
    plugins: [
      new ErudaHtmlPlugin()
    ]
  },
)
