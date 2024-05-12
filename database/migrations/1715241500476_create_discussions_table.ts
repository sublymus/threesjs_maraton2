import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'discussions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();

      table.string('table_id')
      table.uuid('table_name')
      table.uuid('creator_id').notNullable().references('id').inTable('users');
      table.uuid('receiver_id').notNullable().references('id').inTable('users');

      table.string('deleted')  // '__id__' 
      table.string('blocked')//  '__id__' or '__id__:__id__'
      
      table.timestamp('creator_opened_at');
      table.timestamp('receiver_opened_at');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}