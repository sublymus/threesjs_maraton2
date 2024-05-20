import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();

      table.uuid('title')

      table.uuid('table_id')
      table.string('table_name')
      table.uuid('creator_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.uuid('receiver_id').notNullable().references('id').inTable('users').onDelete('CASCADE');

      table.string('deleted')  //'__id__' 
      table.string('closed')//'__id__' or '__id__:__id__'
      
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