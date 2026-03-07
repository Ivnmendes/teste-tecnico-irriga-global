'use strict'

class LoginUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|email|string',
      password: 'required|string'
    }
  }

  get messages () {
    return {
      'username.required': 'O campo username é obrigatório.',
      'username.email': 'Forneça um e-mail válido.',
      'password.required': 'O campo password é obrigatório.'
    }
  }
}

module.exports = LoginUser
