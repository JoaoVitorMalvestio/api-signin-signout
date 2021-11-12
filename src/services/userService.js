const bcrypt = require('bcryptjs')

const RESPONSE_ERROR = require('../models/ResponseError')
const UserRepository = require('./../repositories/User')
const UserModel = require('./../models/User')

const requestValidator = require('../utils/requestValidator')
const token = require('../utils/token')

async function signUp (body) {
  requestValidator.signUp(body)

  let user = UserModel.buildUserByRequest(body)

  if (await UserRepository.findOne({ email: user.email })) { throw RESPONSE_ERROR.EMAIL_READY_EXIST }

  user = await UserRepository.create(user)

  const claim = { id: user._id }
  const userToken = await token.generateToken(claim, 60)

  await UserRepository.updateOne({ _id: user._id }, { token: userToken })

  const [userResponse] = await UserRepository.find({ email: user.email })

  return userResponse
}

async function signIn (body) {
  requestValidator.signIn(body)
  const { email, senha } = body

  const user = await UserRepository.findOne({ email }).select('+senha')

  if (!user) { throw RESPONSE_ERROR.WRONG_USER_OR_PASSWORD }

  if (!await bcrypt.compare(senha, user.senha)) { throw RESPONSE_ERROR.WRONG_USER_OR_PASSWORD }

  delete user.senha

  return user
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
