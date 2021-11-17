const signup = {
  nome: 'nome',
  email: 'email',
  senha: 'senha',
  telefones: [
    {
      numero: 'numero',
      ddd: 'ddd'
    }
  ]
}

const signin = {
  email: 'email',
  senha: 'senha'
}

const signinWrongPassword = {
  email: 'email',
  senha: 'senha1'
}



module.exports = {
  signup,
  signin,
  signinWrongPassword
}
