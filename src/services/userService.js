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

  const claim = { id: user.id }
  const userToken = await token.generateToken(claim, 60)
  user.token = userToken

  await UserRepository.create(user)

  const query = { id: user.id }

  user = UserRepository.findOne(query).select(['-_id', '-__v'])
  user.token = userToken

  return user
}

async function signIn (body) {
  requestValidator.signIn(body)

  const { email, senha } = body

  let user = await UserRepository.findOne({ email }).select(['-_id', '-__v', '+senha'])

  if (!user) { throw RESPONSE_ERROR.WRONG_USER_OR_PASSWORD }

  if (!await bcrypt.compare(senha, user.senha)) { throw RESPONSE_ERROR.WRONG_USER_OR_PASSWORD }

  const claim = { id: user.id }
  const userToken = await token.generateToken(claim, 60)

  const today = clock.today()

  const query = { id: user.id }
  const updateFields = {
    token: userToken,
    ultimoLogin: today
  }

  UserRepository.updateOne(query, updateFields)

  user.token = userToken
  user.ultimoLogin = today
  user.senha = undefined

  return user
}

async function getUser (token, queryString) {
  requestValidator.getUser(queryString)
  const { id } = queryString

  const user = await UserRepository.findOne({ id: id }).select(['-_id', '-__v'])

  if (!await bcrypt.compare(token, user.token)) { throw RESPONSE_ERROR.UNAUTHORIZED }

  if (clock.getDateDiffInMinutes(clock.today(), user.ultimoLogin) >= 30) { throw RESPONSE_ERROR.UNAUTHORIZED }

  user.token = undefined

  return user
}

module.exports = {
  signUp,
  signIn,
  getUser
}
