const nJwt = require('njwt')
const secretKey = 'secretKey@123'

const RESPONSE_ERROR = require('../models/ResponseError')

async function generateToken (claims, expiration) {
  const jwt = nJwt.create(claims, secretKey)
  jwt.setExpiration(getExpirationDate(expiration))
  return jwt.compact()
}

function verifyToken (token) {
  try {
    return nJwt.verify(token, secretKey)
  } catch (error) {
    throw RESPONSE_ERROR.UNAUTHORIZED
  }
}

function getExpirationDate (expirationMinutes) {
  return new Date().getTime() + expirationMinutes * 1000 * 60
}

module.exports = {
  generateToken,
  verifyToken
}
