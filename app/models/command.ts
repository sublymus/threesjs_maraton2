import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

enum CommandEnum {
  DELIVERY='DELIVERY', PAUSE='PAUSE', CANCEL='CANCEL', IN_DELIVERY='IN_DELIVERY',CART='CART'
}

export default class Command extends BaseModel {
  
  public static CommandEnum = CommandEnum

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare product_id: string

  @column()
  declare status: CommandEnum

  @column()
  declare collected_features: string

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column()
  declare payment_id: string 
  
  @column()
  declare delivery_address : string

  @column()
  declare store_id: string

  @column()
  declare user_id: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @beforeSave()
  public static async setUUID (command: Command) {
   if(!command.id)command.id = v4()
  }

}