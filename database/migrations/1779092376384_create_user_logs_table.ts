import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usage_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tool_id').unsigned().references('id').inTable('tools').notNullable()
      table.date('session_date').notNullable()
      table.integer('usage_minutes').nullable().defaultTo(0)
      table.integer('actions_count').nullable().defaultTo(0)
      table.timestamp('created_at')

      //Index
      table.index(['tool_id'], 'tool_id')
      table.index(['session_date', 'tool_id'], 'idx_usage_date_tool')
      table.index(['user_id', 'session_date'], 'idx_usage_user_date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
