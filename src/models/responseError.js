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

const INTERNAL_SERVER_ERROR = {
  status: 500,
  bodyJson: {
    mensagem: 'Internal server error'
  }
}

module.exports = {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
}
