const moment = require('moment')

function today () {
  return moment().format()
}

module.exports = {
  today
}
