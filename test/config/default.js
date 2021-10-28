const path = require('path')

const { merge } = require('webpack-merge')

const ErudaHtmlPlugin = require('../../lib/plugin')
const contextConfig = require('./context')

module.exports = merge(
  contextConfig,
  {
    plugins: [
      new ErudaHtmlPlugin()
    ]
  },
)