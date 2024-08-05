import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'features'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary(); 
      table.string('name').notNullable();
      table.string('view')
      table.boolean('required');
      table.string('placeholder');
      // table.string('default_value');// primitve ou FeatureComponent_id
      table.string('icon')
      table.string('case') // lowercase uppercase capitalize || null
      table.string('match');//tableau json [string  , string]
      table.integer('min'); // list min selecteble ,  input min value
      table.integer('max');
      // table.integer('max_size');// file size
      // table.string('mime_type');//file mime
      // table.string('ext'); // //tableau json string[]
      // table.string('enum'); // JSON of array of primitve or FeatureComponent_id /// if enum avalaible ==> show list else input
      table.uuid('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE');
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}