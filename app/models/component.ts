import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid';

export default class Component extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare images: string;

  @column()
  declare icon: string;

  @column()
  declare scene: string;

  @column()
  declare code: string;

  @column()
  declare key: string;

  @column()
  declare store_id: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @beforeSave()
  public static async setUUID(f_value: Component) {
    if (!f_value.id) f_value.id = v4()
  }

  public static parseComponent(a: Component) {
    let j = [], b = a.$attributes || a;
    try { j = JSON.parse((b).icon) } catch (error) { }
    return { ...b, icon: j }
  }
}