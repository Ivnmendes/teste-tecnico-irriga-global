'use strict'

class RegisterUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      username: 'required|email|unique:users,username',
      password: 'required|string|min:6'
    }
  }

  get messages () {
    return {
      'name.required': 'O campo name é obrigatório.',
      'username.required': 'O campo username é obrigatório.',
      'username.email': 'Forneça um e-mail válido.',
      'username.unique': 'Este e-mail já está em uso.',
      'password.required': 'O campo password é obrigatório.',
      'password.min': 'A senha deve ter pelo menos 6 caracteres.'
    }
  }
}

module.exports = RegisterUser
