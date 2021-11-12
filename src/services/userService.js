const requestValidator = require('../utils/requestValidator')
const clock = require('./../utils/clock')
const RESPONSE_ERROR = require('./../models/responseError')

async function signUp (bodyJson) {
  requestValidator.signUp(bodyJson)

  const user = buildUser(bodyJson)

  return user
}

async function signIn (bodyJson) {
  requestValidator.signIn(bodyJson)

  return bodyJson
}

function buildUser ({ nome, email, senha, telefones, dataCriacao, dataAtualizacao, ultimoLogin, token }) {
  try {
    telefones = telefones.map(({ ddd, numero }) => ({ ddd, numero }))

    const user = {}
    user.nome = nome
    user.email = email
    user.senha = senha
    user.telefones = telefones
    user.dataCriacao = dataCriacao || clock.today()
    user.dataAtualizacao = dataAtualizacao || clock.today()
    user.ultimoLogin = ultimoLogin || clock.today()
    user.token = token || null

    return user
  } catch (err) {
    throw RESPONSE_ERROR.INTERNAL_SERVER_ERROR
  }
}

module.exports = {
  signUp,
  signIn
}
