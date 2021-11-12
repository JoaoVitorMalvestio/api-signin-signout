const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/accenturetest')
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err))
mongoose.Promise = global.Promise

module.exports = mongoose
