import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('images').notNullable()
      table.string('model_images').notNullable()
      table.string('status',10).notNullable()
      table.integer('stock').notNullable()
      table.string('keywords').notNullable() //TODO
      table.uuid('category_id').notNullable().references('id').inTable('categories');
      table.integer('price'); // require if is_dynamic_price
      table.boolean('is_dynamic_price')
      table.uuid('store_id').notNullable().references('id').inTable('stores');
      table.uuid('collaborator_id').notNullable()//TODO remplacer par action
      
      table.uuid('engineer_id')
      table.string('scene_dir')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}