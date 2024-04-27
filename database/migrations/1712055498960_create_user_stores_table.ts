import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users');
      table.uuid('store_id').notNullable().references('id').inTable('stores');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}