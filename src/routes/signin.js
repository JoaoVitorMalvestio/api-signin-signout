const express = require('express')
const router = express.Router()
const signInService = require('../services/signInService')

router.put('/', async function (req, res, next) {
  try {
    const response = await signInService.signIn(req.body)
    res.send(response)
  } catch (error) {
    res.status(error.status).send(error.bodyJson)
  }
})

module.exports = router
