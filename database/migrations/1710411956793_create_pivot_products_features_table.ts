import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pivot_products_features'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('feature_id').notNullable().references('id').inTable('features').onDelete('CASCADE');
      table.uuid('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE');
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}