import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import db from '@adonisjs/lucid/services/db'

export default class ProductComment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare product_id: string

  @column()
  declare user_id: string

  @column()
  declare text: string

  @column()
  declare photos: string

  @column()
  declare photos_count: number

  @column()
  declare videos: string

  @column()
  declare videos_count: number

  @column()
  declare response: string

  @column()
  declare note: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime



  public static async calculProductNote(product_id: string) {
    const res = (await db.query().from(ProductComment.table).where('product_id', product_id).sum('note', 'note').count('id', 'votes'))[0];
    return {
      note:res.note||0,
      votes:res.votes||0,
      star: Math.trunc(Math.ceil( (res.note||0)/((res.votes)||1)*100))/100
    };
  }

  public static parseComment(p: ProductComment['$attributes']) {

    let photos = [];
    try {
      photos = JSON.parse((p.$attributes || p).photos);
    } catch (error) { }
    let videos = [];
    try {
      videos = JSON.parse((p.$attributes || p).videos);
    } catch (error) { }
    return {
      ...(p.$attributes || p),
      photos,
      videos
    }
  }
}