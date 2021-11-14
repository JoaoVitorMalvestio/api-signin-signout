const bcrypt = require('bcryptjs')

const RESPONSE_ERROR = require('../models/ResponseError')
const UserRepository = require('./../repositories/User')
const UserModel = require('./../models/User')

const requestValidator = require('../utils/requestValidator')
const token = require('../utils/token')
const clock = require('../utils/clock')

async function signUp (body) {
  requestValidator.signUp(body)

  let user = UserModel.buildUserByRequest(body)

  if (await UserRepository.findOne({ email: user.email })) { throw RESPONSE_ERROR.EMAIL_READY_EXIST }

  user = await UserRepository.create(user)

  const claim = { id: user._id }
  const userToken = await token.generateToken(claim, 60)

  return UserRepository.findOneAndUpdate({ _id: user._id }, { token: userToken })
}

async function signIn (body) {
  requestValidator.signIn(body)

  const { email, senha } = body

  const user = await UserRepository.findOne({ email }).select('+senha')

  if (!user) { throw RESPONSE_ERROR.WRONG_USER_OR_PASSWORD }

  if (!await bcrypt.compare(senha, user.senha)) { throw RESPONSE_ERROR.WRONG_USER_OR_PASSWORD }

  const claim = { id: user._id }
  const userToken = await token.generateToken(claim, 60)
  const today = clock.today()

  return UserRepository.findOneAndUpdate({ _id: user._id }, { token: userToken, ultimoLogin: today })
}

async function getUser (token, queryString) {
  requestValidator.getUser(queryString)
  const { id } = queryString

  const user = await UserRepository.findOne({ _id: id })

  if (user.token !== token) { throw RESPONSE_ERROR.UNAUTHORIZED }

  if (clock.getDateDiffInMinutes(clock.today(user.ultimoLogin)) >= 30) { throw RESPONSE_ERROR.UNAUTHORIZED }

  return user
}

module.exports = {
  signUp,
  signIn,
  getUser
}
