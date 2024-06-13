import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'features'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary(); 

      table.string('collect_type').notNullable();// string , number , date , files , string[], number[], date[]
      table.string('name').notNullable();
      table.boolean('required');
      table.string('placeholder');
      table.string('default_value');// primitve ou FeatureComponent_id
      table.string('icon')
      table.boolean('lowercase')
      table.boolean('uppercase');
      table.boolean('capitalize');
      table.boolean('trim');
      table.string('match');//tableau json [string  , string]
      table.integer('min_length');// array length
      table.integer('max_length');
      table.integer('min');// interval of number, date, integer.length,
      table.integer('max');
      table.integer('max_size');// file size
      table.string('mime_type');//file mime
      table.string('ext'); // //tableau json string[]
      table.string('enum'); // JSON of array of primitve or FeatureComponent_id /// if enum avalaible ==> show list else input
      table.uuid('store_id').notNullable().references('id').inTable('stores').onDelete('CASCADE');
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}