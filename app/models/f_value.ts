import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid';

export default class FValue extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string;

  @column()
  declare feature_id: string;

  @column()
  declare price: string;

  @column()
  declare url: string;

  @column()
  declare file: string;

  @column()
  declare icon: string;

  @column()
  declare key_word: string;

  @column()
  declare value: string;

  @column()
  declare store_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID (f_value: FValue) {
   if(!f_value.id)f_value.id = v4()
  }
}