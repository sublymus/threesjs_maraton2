import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string
  
  @column()
  declare user_id : string
  
  @column()
  declare context_name: string

  @column()
  declare context_id: string

  @column()
  declare reply_name: string |null

  @column()
  declare reply_id: string|null

  @column()
  declare title: string

  @column()
  declare message: string

  @column()
  declare subject: string

  @column()
  declare files: string

  @column()
  declare type: number

  @column()
  declare close: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID(post: Post) {
    if (!post.id) post.id = v4()
  }
  public static parsePost(p: Post) {

    let files = [];
    try {
      files = JSON.parse((p.$attributes || p).files);
    } catch (error) { throw new Error(error.message); }
    return {
      ...(p.$attributes || p),
      files
    }

  }
}