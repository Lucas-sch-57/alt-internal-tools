import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'access_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('tool_id').unsigned().references('id').inTable('tools').notNullable()
      table.text('business_justification').notNullable()
      table.enum('status', ['pending', 'approved', 'rejected']).nullable().defaultTo('pending')
      table.timestamp('requested_at').nullable()
      table.timestamp('processed_at').nullable()
      table.integer('processed_by').unsigned().references('id').inTable('users').nullable()
      table.text('processing_notes').nullable()

      //Index
      table.index(['tool_id'], 'tool_id')
      table.index(['processed_by'], 'processed_by')
      table.index(['status'], 'idx_requests_status')
      table.index(['user_id'], 'idx_requests_user')
      table.index(['requested_at'], 'idx_requests_date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
