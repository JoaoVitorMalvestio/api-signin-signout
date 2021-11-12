const express = require('express')
const router = express.Router()
const userService = require('./../services/userService')

router.get('/', async function (req, res, next) {
  res.send('respond with a resource')
})

router.put('/signin', async function (req, res, next) {
  try {
    const response = await userService.signIn(req.body)
    res.send(response)
  } catch (error) {
    res.status(error.status).send(error.bodyJson)
  }
})

router.post('/signup', async function (req, res, next) {
  try {
    const response = await userService.signUp(req.body)
    res.send(response)
  } catch (error) {
    res.status(error.status).send(error.bodyJson)
  }
})

module.exports = router
