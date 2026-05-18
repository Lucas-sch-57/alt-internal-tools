import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).notNullable()
      table.string('email', 150).notNullable()
      table
        .enum('department', [
          'Engineering',
          'Sales',
          'Marketing',
          'HR',
          'Finance',
          'Operations',
          'Design',
        ])
        .notNullable()
      table.enum('role', ['employee', 'manager', 'admin']).nullable().defaultTo('employee')
      table.enum('status', ['active', 'inactive']).nullable().defaultTo('active')
      table.date('hire_date').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())

      //Index
      table.index(['department'], 'idx_users_department')
      table.unique(['email'], {
        indexName: 'email',
      })
      table.index(['status'], 'idx_users_status')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
