const fs = require('fs')

module.exports = (module, options) => fs.readFileSync(require.resolve(module, options))
