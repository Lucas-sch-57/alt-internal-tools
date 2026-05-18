import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_tool_access'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tool_id').unsigned().references('id').inTable('tools').notNullable()
      table.timestamp('granted_at').nullable()
      table.integer('granted_by').unsigned().references('id').inTable('users').notNullable()
      table.timestamp('revoked_at').nullable()
      table.integer('revoked_by').unsigned().references('id').inTable('users').nullable()
      table.enum('status', ['active', 'revoked']).nullable().defaultTo('active')

      //Index
      table.unique(['user_id', 'tool_id', 'status'], {
        indexName: 'unique_user_tool_active',
      })
      table.index(['granted_by'], 'granted_by')
      table.index(['revoked_by'], 'revoked_by')
      table.index(['user_id'], 'idx_access_user')
      table.index(['tool_id'], 'idx_access_tool')
      table.index(['granted_at'], 'idx_access_granted_date')
      table.index(['status'], 'idx_access_status')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
