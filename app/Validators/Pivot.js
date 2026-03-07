'use strict'

class Pivot {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description: 'required|string|max:254',
      flowRate: 'required|number|above:0',
      minApplicationDepth: 'required|number'
    }
  }

  get messages () {
    return {
      'description.required': 'A descrição é obrigatória',
      'description.max': 'A descrição não pode ter mais de {{ argument }} caracteres.',
      'flowRate.required': 'A taxa de vazão é obrigatória',
      'flowRate.number': 'A taxa de vazão deve ser um número.',
      'flowRate.above': 'A taxa de vazão deve ser maior que zero.',
      'minApplicationDepth.required': 'A lâmina mínima é obrigatória'
    }
  }
}

module.exports = Pivot
