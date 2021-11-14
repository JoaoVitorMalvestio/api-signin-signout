const express = require('express')
const router = express.Router()
const userService = require('./../services/userService')

const RESPONSE_ERROR = require('../models/ResponseError')

const token = require('./../utils/token')

router.get('/', verifyToken, async function (req, res, next) {
  try {
    const response = await userService.getUser(req.token, req.query)
    res.send(response)
  } catch (error) {
    res.status(error.status).send(error.bodyJson)
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

function verifyToken (req, res, next) {
  try {
    const bearerHeader = req.headers.authorization

    if (!bearerHeader) { throw RESPONSE_ERROR.UNAUTHORIZED }

    const bearerToken = bearerHeader.split(' ')[1]
    token.verifyToken(bearerToken)

    req.token = bearerToken
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
