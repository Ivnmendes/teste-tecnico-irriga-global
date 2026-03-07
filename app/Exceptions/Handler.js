'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {

    if (error.name === 'ValidationException') {
      const formattedErrors = error.messages.reduce((acc, curr) => {
        acc[curr.field] = curr.message
        return acc
      }, {})

      return response.status(error.status).json({
        errors: formattedErrors
      })
    }

    if (error.name === 'InvalidJwtToken' || error.code === 'E_INVALID_JWT_TOKEN') {
      return response.status(401).json({
        message: 'Erro: Token JWT inválido ou ausente.'
      })
    }

    if (
      error.code === 'E_ROUTE_NOT_FOUND' || 
      error.code === 'E_ROW_NOT_FOUND' || 
      error.name === 'ModelNotFoundException'
    ) {
      return response.status(404).json({
        message: 'O recurso solicitado não existe ou você não tem permissão para acessá-lo.'
      })
    }

    return response.status(500).json({
      error: {
        message: 'Erro: Ocorreu um problema interno no servidor',
      }
    })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    console.error("Erro: ", error.status, error.message)
  }
}

module.exports = ExceptionHandler
