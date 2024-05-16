import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: string
  
  @column()
  declare text: string
  
  @column()
  declare table_name:  string

  @column()
  declare table_id:  string

  @column()
  declare files:  string

  @column()
  declare audio:  string

  @column()
  declare survey_id:  string

  @column()
  declare rating_id:  string

  @column()
  declare form_id:  string

  @column()
  declare user_id:  string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   declare updated_at: DateTime

  @beforeSave()
  public static async setUUID (message: Message) {
    if(!message.id)message.id = v4()
  }
public static parseMessage(m:Message){
  
  let files = [];
  try {
    files = JSON.parse((m.$attributes||m).files);
  } catch (error) { throw new Error(error.message);}
  return {
    ...(m.$attributes||m),
    files
  }

}
}
