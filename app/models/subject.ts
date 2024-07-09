import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Subject extends BaseModel {
 
  @column({ isPrimary: true })
  declare id: string
  
  @column()
  declare user_id : string

  @column()
  declare title: string

  @column()
  declare message: string

  @column()
  declare targs: string

  @column()
  declare files: string

  @column()
  declare isPrivate: boolean

  @column()
  declare close: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID(post: Subject) {
    if (!post.id) post.id = v4()
  }
  public static parseSubject(p: Subject) {

    let files = [];
    try {
      files = JSON.parse((p.$attributes || p).files);
    } catch (error) { throw new Error(error.message); }
    return {
      ...(p.$attributes || p),
      files 
    } as Subject
  }
}