import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'features'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary(); 

      table.string('collect_type').notNullable();
      table.string('name').unique().notNullable();
      table.boolean('required');
      table.string('placeholder');
      table.string('view');
      table.string('default_value');// primitve ou f_value
      table.string('icon')
      table.boolean('lowercase')
      table.boolean('uppercase');
      table.boolean('capitalize');
      table.string('trim');
      table.string('match');//tableau json [string  , string]
      table.string('min_length');
      table.string('max_length');
      table.string('min');
      table.string('max');
      table.string('max_size');
      table.string('mime');
      table.string('ext'); // //tableau json string[]
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}