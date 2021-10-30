const path = require('path')
const fs = require('fs')

function readFileFromDist(relativePath) {
  const absPath = path.resolve(__dirname, '../boilerplate/dist/', relativePath)
  return fs.readFileSync(absPath, 'utf-8')
}

module.exports = readFileFromDist
