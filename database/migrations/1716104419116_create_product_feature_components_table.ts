import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_feature_components'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.uuid('component_id').references('id').inTable('components').onDelete('CASCADE')
      table.uuid('feature_id').references('id').inTable('features').onDelete('CASCADE')
      table.uuid('store_id').references('id').inTable('stores').onDelete('CASCADE')
      table.integer('price')
      table.string('unity', 10)
      table.string('devise',10)
      table.boolean('is_default')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}