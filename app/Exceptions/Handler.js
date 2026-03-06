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
      const formattedErrors = error.messages.map(err => ({
        message: err.message
      }))
      
      return response.status(error.status).json(formattedErrors)
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
