'use strict'

class Irrigation {
  get validateAll () {
    return true
  }

  get rules () {
    const isUpdate = this.ctx.request.method() === 'PUT' || this.ctx.request.method() === 'PATCH'

    if (isUpdate) {
      return {
        applicationAmount: 'required|number|above:0'
      }
    }

    return {
      pivotId: 'required|string|regex:^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
      applicationAmount: 'required|number|above:0'
    }
  }

  get messages () {
    return {
      'pivotId.required': 'O ID do pivô é obrigatório.',
      'pivotId.regex': 'O ID do pivô deve ser um UUID válido.',
      'applicationAmount.required': 'O valor de irrigação é obrigatório',
      'applicationAmount.number': 'O valor de irrigação deve ser um número.',
      'applicationAmount.above': 'O valor de irrigação deve ser maior que zero.',
    }
  }
}

module.exports = Irrigation
