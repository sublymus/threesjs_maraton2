import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'f_values'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary();

      table.string('label').notNullable();
      table.uuid('feature_id').notNullable().references('id').inTable('features').onDelete('CASCADE');
      table.string('price');
      table.string('url');
      table.string('file');
      table.string('icon');
      table.string('key_word');
      table.string('value');

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}