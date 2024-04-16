import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')

      table.string('name')
      table.uuid('collaborator_id').notNullable().references('id').inTable('users');
      table.boolean('filter_client')
      table.boolean('ban_client')
      table.boolean('filter_collaborator')
      table.boolean('ban_collaborator')
      table.boolean('create_delete_collaborator')
      table.boolean('manage_interface')
      table.boolean('filter_product')
      table.boolean('edit_product')
      table.boolean('create_delete_product')
      table.boolean('manage_scene_product')
      table.boolean('chat_client')
      table.boolean('filter_command')
      table.boolean('manage_command')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

/*

filter_flient
ban_client
filter_collaborator
ban_collaborator
create_delete_collaborator

manage_interface

filter_product
edit_product
create_delete_product
manage_scene_product : boolean

chat_client

filter_command
manage_command

*/