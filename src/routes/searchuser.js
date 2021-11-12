const express = require('express')
const router = express.Router()

router.get('/', async function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
