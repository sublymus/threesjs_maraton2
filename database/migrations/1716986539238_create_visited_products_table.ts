import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'visited_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.uuid('client_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}