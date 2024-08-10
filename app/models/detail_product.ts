import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class DetailProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare detail: string

  @column()
  declare images: string | null

  @column()
  declare index: number | null

  @column()
  declare product_id: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID(a: DetailProduct) {
    if (!a.id) a.id = v4()
  }

  public static parseDetail(a: DetailProduct) {
    let b = a.$attributes || a;
    try {
      b.images = JSON.parse(b.images);
    } catch (error) {
      b.images = []
      console.log(error);
    }
    return { ...b }
  }

}