import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'
import User from './user.js'
import db from '@adonisjs/lucid/services/db'
import Message from './message.js'

export default class Subject extends BaseModel {

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare user_id: string

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
  public static async  parseSubject(p: Subject) {

    let files = [];
    try {
      files = JSON.parse((p.$attributes || p).files);
    } catch (error) {  }
    let t: any = []
    try {
      t = JSON.parse(p.targs)
    } catch (error) { }
    let user:any = await User.find(p.user_id) || undefined
    if (user)  user = User.ParseUser(user)
    
    return {
      ...(p.$attributes || p),
      files,
      targs: t,
      user,
      count: (await db.query().from(Message.table).select('id').where('table_id', p.id)).length,
    }
  }
}