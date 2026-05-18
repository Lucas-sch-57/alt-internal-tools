import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.text('description').nullable()
      table.string('color_hex', 7).nullable().defaultTo('#6366f1')
      table.timestamp('created_at')

      //Index
      table.unique(['name'], {
        indexName: 'name',
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
