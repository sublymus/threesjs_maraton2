import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { USER_TYPE } from './user.js'

export default class UserStore extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare roleId : string


  @column()
  declare type : USER_TYPE
 
  @column()
  declare user_id : string
 
  @column()
  declare store_id : string
 
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

//