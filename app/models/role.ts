import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare store_id: string

  @column()
  declare filter_client: boolean

  @column()
  declare ban_client: boolean

  @column()
  declare filter_collaborator: boolean

  @column()
  declare ban_collaborator: boolean

  @column()
  declare create_delete_collaborator: boolean

  @column()
  declare manage_interface: boolean

  @column()
  declare filter_product: boolean

  @column()
  declare edit_product: boolean

  @column()
  declare create_delete_product: boolean

  @column()
  declare manage_scene_product: boolean

  @column()
  declare chat_client: boolean

  @column()
  declare filter_command: boolean

  @column()
  declare manage_command: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID (role: Role) {
   if(!role.id)role.id = v4()
  }
}

export const JsonRole = {
  filter_client: '',
  ban_client: '',
  filter_collaborator: '',
  ban_collaborator: '',
  create_delete_collaborator: '',
  manage_interface: '',
  filter_product: '',
  edit_product: '',
  create_delete_product: '',
  manage_scene_product: '',
  chat_client: '',
  filter_command: '',
  manage_command: '',
} as const 

export type TypeJsonRole = {
  [k in keyof typeof JsonRole]: (typeof JsonRole)[k] extends '' ? boolean : string ;
}