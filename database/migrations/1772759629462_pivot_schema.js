'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PivotSchema extends Schema {
  up () {
    this.create('pivots', (table) => {
      table.uuid('uuid').primary()
      table.string('description', 254).notNullable()
      table.float('flowRate').notNullable()
      table.float('minApplicationDepth').notNullable()
      table.uuid('userUuid')
        .notNullable()
        .references('uuid')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('pivots')
  }
}

module.exports = PivotSchema
