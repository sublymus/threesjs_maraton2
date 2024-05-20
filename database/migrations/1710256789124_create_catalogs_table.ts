import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'catalogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
     
      table.string('label').notNullable()
      table.string('description')
      table.string('scene_dir')
      table.uuid('store_id').notNullable().references('id').inTable('stores').onDelete('CASCADE');
    
    
      table.smallint('index').notNullable();
      table.string('status').notNullable();
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}