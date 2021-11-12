const RESPONSE_ERROR = require('../models/responseError')

function signIn ({ email, senha }) {
  if (!email || !senha) { throw RESPONSE_ERROR.BAD_REQUEST }
}

function signUp ({ nome, email, senha, telefones }) {
  if (!nome || !email || !senha || !telefones) { throw RESPONSE_ERROR.BAD_REQUEST }
  if (!Array.isArray(telefones)) { throw RESPONSE_ERROR.BAD_REQUEST }
  telefones.forEach(({ ddd, numero }) => { if (!ddd || !numero) { throw RESPONSE_ERROR.BAD_REQUEST } })
}

module.exports = {
  signIn,
  signUp
}
