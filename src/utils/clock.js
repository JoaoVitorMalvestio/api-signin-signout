const moment = require('moment')

function today () {
  return moment().format()
}

function getDateDiffInMinutes (date1, date2) {
  return moment(date1).diff(date2, 'minutes')
}

module.exports = {
  today,
  getDateDiffInMinutes
}
