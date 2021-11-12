const NOT_FOUND = {
  status: 404,
  bodyJson: {
    mensagem: 'Not found'
  }
}

const BAD_REQUEST = {
  status: 400,
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

const UNAUTHORIZED = {
  status: 401,
  bodyJson: {
    mensagem: 'Não autorizado'
  }
}

const EMAIL_READY_EXIST = {
  status: 412,
  bodyJson: {
    mensagem: 'Email já existente'
  }
}

module.exports = {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  EMAIL_READY_EXIST
}
