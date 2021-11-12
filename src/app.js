const express = require('express')
const logger = require('morgan')

const userRouter = require('./routes/user')

const RESPONSE_ERROR = require('./models/responseError')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRouter)

app.use(function (req, res, next) {
  res.status(RESPONSE_ERROR.NOT_FOUND.status).send(RESPONSE_ERROR.NOT_FOUND.bodyJson)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
