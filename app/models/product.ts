import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

enum PRODUCT_STATUS {
  PAUSE = 'PAUSE', VISIBLE = 'VISIBLE', TRASH = 'TRASH',
}

export default class Product extends BaseModel {



  public static STATUS = PRODUCT_STATUS;

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare images: string // json string[]

  @column()
  declare model_images: string //json string[]

  @column()
  declare status: string

  @column()
  declare stock: number

  @column()
  declare keywords: string
  @column()
  declare category_id: string

  @column()
  declare price: number

  @column()
  declare detail_json: string

  @column()
  declare note: number

  @column()
  declare comments: number

  @column()
  declare store_id: string

  @column()
  declare collaborator_id: string

  @column()
  declare engineer_id?: string

  @column()
  declare scene_dir?: string

  @column()
  declare star : number
  
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @beforeSave()
  public static async setUUID(product: Product) {
    if (!product.id) product.id = v4()
  }

  public static clientProduct(product: Product, addon?: Record<string, any>) {
    const att = product.$attributes || product;
    ['images', 'model_images'].forEach(f => {
      try {
        if (typeof att[f] == 'string') att[f] = JSON.parse(att[f] || "[]");
        else if(typeof att[f] == 'string' ) att[f] = []
      } catch (error) {
        att[f] = []
      }
    });
    for (const key in addon) {
      att[key] = addon[key]
    }
    att.star = Number(att.star||'0')
    return att;
  }

}