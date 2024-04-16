import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')

      table.string('name').notNullable();
      table.uuid('provider_id').notNullable().references('id').inTable('providers');
      table.string('description')
      table.uuid('interface_id')//.notNullable();
      table.timestamp('expire_at')
      

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}