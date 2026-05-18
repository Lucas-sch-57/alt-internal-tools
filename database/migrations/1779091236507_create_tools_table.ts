import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tools'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.text('description').nullable()
      table.string('vendor', 100).nullable()
      table.string('website_url', 255).nullable()
      table.integer('category_id').unsigned().references('id').inTable('categories').notNullable()
      table.decimal('monthly_cost', 10, 2).notNullable()
      table.integer('active_users_count').notNullable().defaultTo(0)
      table
        .enum('owner_department', [
          'Engineering',
          'Sales',
          'Marketing',
          'HR',
          'Finance',
          'Operations',
          'Design',
        ])
        .notNullable()
      table.enum('status', ['active', 'deprecated', 'trial']).nullable().defaultTo('active')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      //Index
      table.index(['category_id'], 'idx_tools_category')
      table.index(['owner_department'], 'idx_tools_department')
      table.index(['monthly_cost'], 'idx_tools_cost_desc')
      table.index(['status'], 'idx_tools_status')
      table.index(['active_users_count'], 'idx_tools_active_users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
