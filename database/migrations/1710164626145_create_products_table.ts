import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('images').notNullable()
      table.string('model_images')
      table.string('status',10).notNullable()
      table.integer('stock').notNullable()
      table.string('keywords').notNullable() //TODO
      table.uuid('category_id').notNullable().references('id').inTable('categories').onDelete('CASCADE');
      table.integer('price'); // require if is_dynamic_price
      table.smallint('star')
      table.string('meta_data') // json payement info
      table.integer('comments')
      table.uuid('store_id').notNullable().references('id').inTable('stores').onDelete('CASCADE');
      table.string('scene_dir')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}