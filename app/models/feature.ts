import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Feature extends BaseModel {

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare collect_type: string

  @column()
  declare name: string

  @column()
  declare required: boolean

  @column()
  declare placeholder: string

  @column()
  declare default_value: string

  @column()
  declare icon: string

  @column()
  declare lowercase: string

  @column()
  declare uppercase: string

  @column()
  declare capitalize: string

  @column()
  declare trim: string //toujour true

  @column()
  declare match: string

  @column()
  declare min_length: string

  @column()
  declare max_length: string

  @column()
  declare min: string

  @column()
  declare max: string

  @column()
  declare max_size: string

  @column()
  declare mime: string

  @column()
  declare enum: string

  @column()
  declare ext: string // unuse

  @column()
  declare store_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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