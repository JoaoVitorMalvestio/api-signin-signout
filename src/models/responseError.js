const NOT_FOUND = {
  status: 404,
  bodyJson: {
    mensagem: 'Not found'
  }
}

const BAD_REQUEST = {
  status: 412,
  bodyJson: {
    mensagem: 'Bad request'
  }
}

module.exports = {
  NOT_FOUND,
  BAD_REQUEST
}
