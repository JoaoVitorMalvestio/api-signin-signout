const RESPONSE_ERROR = require('../models/responseError')

function signIn ({ email, senha }) {
  if (!email || !senha) { throw RESPONSE_ERROR.BAD_REQUEST }
}

module.exports = {
  signIn
}
