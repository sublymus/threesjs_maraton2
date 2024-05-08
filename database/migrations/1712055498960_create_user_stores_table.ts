import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('role_id')
      table.string('type', 25);
      table.string('user_id').notNullable();
      table.uuid('store_id').references('id').inTable('stores');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}