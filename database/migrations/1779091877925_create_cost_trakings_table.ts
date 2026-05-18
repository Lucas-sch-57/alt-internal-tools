import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cost_tracking'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tool_id').unsigned().references('id').inTable('tools').notNullable()
      table.date('month_year').notNullable()
      table.decimal('total_monthly_cost', 10, 2).notNullable()
      table.integer('active_users_count').notNullable().defaultTo(0)
      table.timestamp('created_at')

      //Index
      table.unique(['tool_id', 'month_year'], {
        indexName: 'unique_tool_month',
      })
      table.index(['month_year', 'tool_id'], 'idx_cost_month_tool')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
