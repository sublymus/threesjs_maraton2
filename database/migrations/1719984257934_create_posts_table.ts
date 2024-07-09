import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id')
      table.string('context_name').notNullable()
      table.uuid('context_id')
      table.string('reply_name')
      table.uuid('reply_id')
      table.string('message')
      table.string('files')
      table.string('subject')
      table.smallint('type')
      table.smallint('close')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}