import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      
      table.string('table_name')
      table.uuid('table_id')
      
      table.string('text')
      table.string('files')
      table.string('audio')
      table.uuid('survey_id')
      table.uuid('rating_id')
      table.uuid('form_id')
      table.uuid('user_id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}