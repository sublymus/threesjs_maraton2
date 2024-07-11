import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class UserBrowser extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare user_id: string

  @column()
  declare user_agent: string

  @column()
  declare notification_data: string

  @column()
  declare token: string

  @column()
  declare enable: boolean | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID(post: UserBrowser) {
    if (!post.id) post.id = v4()
  }
  public static parseUserBrowser(p: UserBrowser) {
    let notification_data;
    try {
      notification_data = JSON.parse((p.$attributes || p).notification_data);
    } catch (error) { }
    
    return {
      ...(p.$attributes || p),
      notification_data

    }
  }
}