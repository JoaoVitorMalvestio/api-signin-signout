const express = require('express')
const router = express.Router()
const userService = require('./../services/userService')

const RESPONSE_ERROR = require('../models/ResponseError')

router.get('/', getRequestToken, async function (req, res, next) {
  try {
    const response = await userService.getUser(req.token, req.query)
    res.send(response)
  } catch (error) {
    finishRequestWithError(res, error)
  }
})

router.put('/signin', async function (req, res, next) {
  try {
    const { body } = req
    const response = await userService.signIn(body)
    res.send(response)
  } catch (error) {
    finishRequestWithError(res, error)
  }
})

router.post('/signup', async function (req, res, next) {
  try {
    const response = await userService.signUp(req.body)
    res.send(response)
  } catch (error) {
    finishRequestWithError(res, error)
  }
})

function getRequestToken (req, res, next) {
  try {
    const bearerHeader = req.headers.authorization

    if (!bearerHeader) { throw RESPONSE_ERROR.UNAUTHORIZED }

    req.token = bearerHeader.split(' ')[1]

    next()
  } catch (error) {
    finishRequestWithError(res, error)
  }
}

function finishRequestWithError (res, error) {
  if (error.status && error.bodyJson) { res.status(error.status).send(error.bodyJson) } else {
    console.log(error)

    res.status(RESPONSE_ERROR.INTERNAL_SERVER_ERROR.status).send(RESPONSE_ERROR.INTERNAL_SERVER_ERROR.bodyJson)
  }
}

module.exports = router
