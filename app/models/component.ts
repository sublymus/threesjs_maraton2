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
  declare price: number;

  @column()
  declare scene: string;

  @column()
  declare scene_code: string;

  @column()
  declare is_default: boolean;

  @column()
  declare feature_id: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @beforeSave()
  public static async setUUID(c: Component) {
    if (!c.id) c.id = v4()
  }

  public static parseComponent(a: Component) {
    let j = [], b = a.$attributes || a;
    try { j = JSON.parse((b).images) } catch (error) { console.log(error);
     }
    return { ...b, images: j }
  }
}