const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'test') {
  const Mockgoose = require('mockgoose').Mockgoose
  const mockgoose = new Mockgoose(mongoose)

  mockgoose.prepareStorage().then(function () {
    mongoose.connect('mongodb://localhost/accenturetest', function (err) {
      console.log('connected')
    })
  })
} else {
  mongoose.connect('mongodb://localhost/accenturetest')
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err))
}

mongoose.Promise = global.Promise

module.exports = mongoose
