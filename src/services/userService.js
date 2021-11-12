const RESPONSE_ERROR = require('../models/ResponseError')
const UserRepository = require('./../repositories/User')
const UserModel = require('./../models/User')

const requestValidator = require('../utils/requestValidator')
const token = require('../utils/token')

async function signUp (body) {
  requestValidator.signUp(body)

  let user = UserModel.buildNewUserByRequest(body)

  const [existUser] = await UserRepository.find({ email: user.email })

  if (existUser) { throw RESPONSE_ERROR.EMAIL_READY_EXIST }

  user = await UserRepository.create(user)

  const claim = { id: user._id }
  const userToken = await token.generateToken(claim, 60)

  await UserRepository.updateOne({ _id: user._id }, { token: userToken })

  const [userResponse] = await UserRepository.find({ email: user.email })

  return userResponse
}

async function signIn (body) {
  requestValidator.signIn(body)

  return body
}

async function getUser (token) {
  const { body } = token

  return body
}

module.exports = {
  signUp,
  signIn,
  getUser
}
