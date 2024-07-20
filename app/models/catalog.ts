import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Catalog extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string
 
  @column()
  declare description?: string

  @column()
  declare scene_dir?: string

  @column()
  declare index: number

  @column()
  declare status: string

  @column()
  declare store_id: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @beforeSave()
  public static async setUUID (catalog: Catalog) {
   if(!catalog.id)catalog.id = v4()
  }
}