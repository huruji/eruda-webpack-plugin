const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../boilerplate/'),
  output: {
    path: path.resolve(__dirname, '../boilerplate/dist/')
  },
}