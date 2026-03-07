'use strict'

const { v4: uuidv4 } = require('uuid')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pivot extends Model {
    static boot () {
        super.boot()

        this.addHook('beforeCreate', async (pivotInstance) => {
            pivotInstance.id = uuidv4()
        })
    }

    static get incrementing () {
        return false
    }
}

module.exports = Pivot
