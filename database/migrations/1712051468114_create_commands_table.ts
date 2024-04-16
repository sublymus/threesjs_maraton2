import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commands'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')

      table.uuid('product_id').notNullable().references('id').inTable('products');
      table.string('status').notNullable();
      table.smallint('quantity').notNullable()
      table.integer('price').notNullable();
      table.uuid('payment_id') // payment mode |catre | crypto   ---   servive |leamonskizi| criptoblabla  -------
      table.string('delivery_address')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}