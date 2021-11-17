const mongoose = require('mongoose')

const DB_NAME = process.env.NODE_ENV === 'test' ? 'localtest_mongodb' : 'accenturetest'

mongoose.connect('mongodb://localhost/'.concat(DB_NAME))
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

module.exports = mongoose
