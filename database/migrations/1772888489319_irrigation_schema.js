'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IrrigationSchema extends Schema {
  up () {
    this.create('irrigations', (table) => {
      table.uuid('id').primary()
      table.uuid('pivotId')
        .notNullable()
        .references('id')
        .inTable('pivot')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.float('applicationAmount').notNullable()
      table.timestamp('irrigationDate').notNullable()
      table.timestamp('updated_at').notNullable()
      table.uuid('userId')
        .notNullable()
        .references('uuid')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('irrigations')
  }
}

module.exports = IrrigationSchema
