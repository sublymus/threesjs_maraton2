import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserNotifContext extends BaseModel {
  @column()
  declare user_id:string

  @column()
  declare context_name:string

  @column()
  declare context_id:string

 }