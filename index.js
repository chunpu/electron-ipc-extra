const electron = require('electron')

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = require('./renderer')
} else {
  module.exports = require('./main')
}
