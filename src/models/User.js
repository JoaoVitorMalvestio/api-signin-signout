const clock = require('./../utils/clock')
const RESPONSE_ERROR = require('../models/ResponseError')
const { v4: uuidv4 } = require('uuid')

function buildUserByRequest ({ nome, email, senha, telefones }) {
  try {
    telefones = telefones.map(({ ddd, numero }) => ({ ddd, numero }))

    const user = {}
    user.id = uuidv4()
    user.nome = nome
    user.email = email
    user.senha = senha
    user.telefones = telefones
    user.dataCriacao = clock.today()
    user.dataAtualizacao = clock.today()
    user.ultimoLogin = clock.today()

    return user
  } catch (err) {
    throw RESPONSE_ERROR.INTERNAL_SERVER_ERROR
  }
}

module.exports = {
  buildUserByRequest
}
