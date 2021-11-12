const mongoose = require('../repositories/index')
const bcrypt = require('bcryptjs')

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

UserSchema.pre('save', async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10)

  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
