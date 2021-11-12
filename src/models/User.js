const mongoose = require('../repositories/index')

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  senha: {
    type: String,
    select: false,
    require: true
  },
  telefones: {
    type: Array,
    require: true
  },
  dataCriacao: {
    type: String,
    require: true
  },
  dataAtualizacao: {
    type: String,
    require: true
  },
  ultimoLogin: {
    type: String,
    require: true
  },
  token: {
    type: String,
    require: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
