import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Command extends BaseModel {
  @column({ isPrimary: true })
  declare id: string


  @column()
  declare store_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID (command: Command) {
   if(!command.id)command.id = v4()
  }

}