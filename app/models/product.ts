import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

enum PRODUCT_STATUS{
  PAUSE='PAUSE',VISIBLE='VISIBLE',TRASH='TRASH',
} 

export default class Product extends BaseModel {
  
  

  public static STATUS  =  PRODUCT_STATUS;

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
  declare keywords : string
  @column()
  declare category_id: string  
  
  @column()
  declare price: number
  
  @column()
  declare is_dynamic_price: number
    
  @column()
  declare store_id: string  

  @column()
  declare collaborator_id: string

  @column()
  declare engineer_id?: string  
  
  @column()
  declare scene_dir?: string  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID (product: Product) {
   if(!product.id)product.id = v4()
  }

  public static clientProduct(product : Product , addon? : Record<string,any>){
    const att  = product.$attributes||product;
    ['images','model_images'].forEach(f => {
      try {
        if(typeof att[f] == 'string') att[f] = JSON.parse(att[f]||"[]");
        else att[f] = []
      } catch (error) {
        att[f] = []
      }
    });
    return {
      ...att,
      ...addon
    }
  }

}