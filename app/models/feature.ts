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
  declare view: string
  
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
  declare trim: string
  
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
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID (feature: Feature) {
   if(!feature.id)feature.id = v4()
  }
}