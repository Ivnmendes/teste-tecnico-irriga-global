'use strict'
const User = use('App/Models/User')

class AuthController {

    async register ({ request, auth, response }) {
        const data = request.only(['username', 'name', 'password'])

        const user = await User.create(data)

        const token = await auth.generate(user)

        return response.status(201).json({ user, token })
    }

    async login({ request, auth, response }) {
        const { username, password } = request.all()

        try {
            const jwt = await auth.attempt(username, password)
            return response.ok({
                message: "Usuário autenticado com sucesso.",
                token: jwt.token
            })
        } catch (error) {
            console.log(error)
            return response.status(401).json({
                message: 'Erro: Credenciais inválidas.'
            })
        }
    }
}

module.exports = AuthController
