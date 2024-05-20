import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'components'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary();

      table.string('name').notNullable();
      table.string('description');
      table.string('images');
      table.string('icon');
      table.string('scene');
      table.string('code');
      table.string('key');
      table.uuid('store_id').references('id').inTable('stores').onDelete('CASCADE');

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}