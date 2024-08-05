import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'components'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary();
      
      table.string('name').notNullable();
      table.integer('price');
      table.string('description');
      table.string('images');
      table.string('scene');
      table.string('scene_code');
      table.uuid('feature_id');
      
      table.boolean('is_default')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}