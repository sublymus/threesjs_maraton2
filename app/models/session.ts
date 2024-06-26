import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Session extends BaseModel {
  
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title :string

  @column()
  declare table_name: string | null
  
  @column()
  declare table_id: string |null
  
  @column()
  declare creator_id: string
  
  @column()
  declare receiver_id: string

  @column()
  declare deleted: string | null

  @column()
  declare closed: string | null

  @column.dateTime()
  declare creator_opened_at: DateTime

  @column.dateTime()
  declare receiver_opened_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true , })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true , })
   declare updated_at: DateTime

  @beforeSave()
  public static async setUUID (session: Session) {
    if(!session.id)session.id = v4()
  }

}