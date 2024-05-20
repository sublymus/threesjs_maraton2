import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('name').notNullable().unique();
      table.uuid('owner_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('description')
      table.uuid('interface_id')
      table.string('website')
      table.string('phone')
      table.string('store_email')
      table.string('banners')
      table.string('logo')
      table.uuid('address_id')
      table.timestamp('expire_at')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}