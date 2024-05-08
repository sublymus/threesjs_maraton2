import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare owner_id: string

  @column()
  declare description: string

  @column()
  declare phone: string

  @column()
  declare store_email: string

  @column()
  declare address_id: string

  @column()
  declare banners: string

  @column()
  declare website: string

  @column()
  declare interface_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID (store: Store) {
   if(!store.id)store.id = v4()
  }

  public static ParseStore(store: Store) {
    const att: any = {};

    ['banners'].forEach(a => {
      try {
        att[a] = JSON.parse((store.$attributes || store)[a])
      } catch (error) { }
    })
    const r = {
      ...(store.$attributes || store),
      ...att
    }
    
    return r
  }
}