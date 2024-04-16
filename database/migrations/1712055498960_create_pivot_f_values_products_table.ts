import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pivot_f_values_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('product_id').notNullable().references('id').inTable('products');
      table.uuid('f_value_id').notNullable().references('id').inTable('f_values');
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}