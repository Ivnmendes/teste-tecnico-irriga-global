'use strict'

class RegisterUser {

  get rules () {
    return {
      name: 'required|string',
      username: 'required|email|unique:users,username',
      password: 'required|string|min:6'
    }
  }

  get messages () {
    return {
      'name.required': 'Erro: O campo name é obrigatório.',
      'username.required': 'Erro: O campo username é obrigatório.',
      'username.email': 'Erro: Forneça um e-mail válido.',
      'username.unique': 'Erro: Este e-mail já está em uso.',
      'password.required': 'Erro: O campo password é obrigatório.',
      'password.min': 'Erro: A senha deve ter pelo menos 6 caracteres.'
    }
  }
}

module.exports = RegisterUser
