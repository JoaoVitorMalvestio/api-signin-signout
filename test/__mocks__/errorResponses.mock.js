const notFoundResponse = { mensagem: 'Not found' }
const emailAlreadyExistResponse = { mensagem: 'Email já existente' }
const wrongEmailOrPassword = { mensagem: 'Usuário e/ou senha inválidos' }
const unauthorized = { mensagem: 'Não autorizado' }

module.exports = {
  notFoundResponse,
  emailAlreadyExistResponse,
  wrongEmailOrPassword,
  unauthorized
}
