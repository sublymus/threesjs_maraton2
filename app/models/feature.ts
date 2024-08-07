import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Feature extends BaseModel {

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare view: string

  @column()
  declare required: boolean

  @column()
  declare placeholder: string

  @column()
  declare icon: string

  @column()
  declare case: string

  @column()
  declare match: string

  @column()
  declare min: string

  @column()
  declare max: string

  @column()
  declare product_id: string

  // @column()
  // declare max_size: string

  // @column()
  // declare mime: string

  // @column()
  // declare ext: string // unuse

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @beforeSave()
  public static async setUUID(a: Feature) {
    if (!a.id) a.id = v4()
  }

  public static parseFeature(a: Feature) {
    let j = [], b = a.$attributes || a;
    try { j = JSON.parse((b).icon) } catch (error) { }
    return { ...b, icon: j }
  }
}