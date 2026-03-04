'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

/* Funções temporárias para teste do modelo de usuário*/

Route.get('/test-user', async () => {
  let user = new User()
  user.name = 'Teste'
  user.username = 'teste@gmail.com'
  user.password = '123456789#'

  await user.save()

  return user.toJSON()
})

Route.get('/users', async () => {
  const users = await User.all()
  return users
})