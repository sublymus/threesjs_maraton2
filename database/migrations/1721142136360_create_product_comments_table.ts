import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('product_id').notNullable()
      table.uuid('user_id').notNullable()
      table.string('text').notNullable()
      table.string('photos')
      table.smallint('photos_count').notNullable()
      table.string('videos')
      table.smallint('videos_count').notNullable()
      table.string('response')
      table.smallint('note').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}