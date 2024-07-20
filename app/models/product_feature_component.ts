import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProductFeatureComponent extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare product_id: string

  @column()
  declare component_id: string

  @column()
  declare feature_id: string

  @column()
  declare price: number

  @column()
  declare unity: string

  @column()
  declare is_default: boolean

  @column()
  declare store_id : string

  @column()
  declare devise: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}