const Validator = require('./../utils/validator')

async function signIn (bodyJson) {
  Validator.signIn(bodyJson)

  return bodyJson
}

module.exports = {
  signIn
}
