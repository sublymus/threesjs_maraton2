import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detail_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('title').notNullable();
      table.string('detail').notNullable();
      table.uuid('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE')
      table.string('images')
      table.smallint('index')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }

}