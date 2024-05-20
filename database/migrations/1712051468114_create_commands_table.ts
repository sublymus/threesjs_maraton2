import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commands'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE');
      table.string('status').notNullable(); // status => Cart Pause Annulle cancel in_delivery delivered 
      table.string('collected_features') // json of { feature_id : collected_value }
      table.smallint('quantity').notNullable()
      table.integer('price').notNullable();
      table.uuid('payment_id') // payment mode |catre | crypto   ---   servive |leamonskizi| criptoblabla  -------
      table.string('delivery_address')
      table.uuid('store_id').notNullable().references('id').inTable('stores').onDelete('CASCADE');
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}