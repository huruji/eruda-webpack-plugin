const path = require('path')
const ErudaHtmlPlugin = require('../../lib/plugin')

module.exports = {
  context: path.resolve(__dirname, '../boilerplate/'),
  plugins: [
    new ErudaHtmlPlugin()
  ]
}