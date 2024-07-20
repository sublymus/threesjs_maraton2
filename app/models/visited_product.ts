import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class VisitedProduct extends BaseModel {
  
  @column()
  declare product_id : string;

  @column()
  declare client_id : string;
  
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime 
}