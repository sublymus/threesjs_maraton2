import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { USER_TYPE } from './user.js'
import { v4 } from 'uuid'
import db from '@adonisjs/lucid/services/db'
import { TypeJsonRole } from './role.js'
import Store from './store.js'

export default class UserStore extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare roleId : string


  @column()
  declare type : USER_TYPE
 
  @column()
  declare user_id : string
 
  @column()
  declare store_id : string
 
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async setUUID (userStore: UserStore) {
   if(!userStore.id)userStore.id = v4()
  }

  public static async  notClient(user_id:string, store_id:string, _premision?:Partial<TypeJsonRole>){
    return (await db.query().from(UserStore.table).select('*').where('user_id', user_id).andWhere('store_id', store_id).whereNot((p) => p.where('type', 'CLIENT')))[0] as UserStore|undefined;
  }
  public static async  isOwner(user_id:string, store_id:string, _premision?:Partial<TypeJsonRole>){
    return (await db.query().from(Store.table).select('*').where('user_id', user_id).andWhere('store_id', store_id).andWhere('type',USER_TYPE.OWNER).limit(1))[0] as UserStore|undefined;
  }
  public static async  isCollaborator(user_id:string, store_id:string, _premision?:Partial<TypeJsonRole>){
    return (await db.query().from(UserStore.table).select('*').where('user_id', user_id).andWhere('store_id', store_id).andWhere('type',USER_TYPE.COLLABORATOR).limit(1))[0] as UserStore|undefined;
  }
  public static async  isStoreManager(user_id:string, store_id:string, _premision?:Partial<TypeJsonRole>){
    return (await db.query().from(UserStore.table).select('*').where('user_id', user_id).andWhere('store_id', store_id).andWhere((p)=>{
      p.where('type',USER_TYPE.COLLABORATOR).orWhere('type',USER_TYPE.OWNER)
    }).limit(1))[0] as UserStore|undefined;
  }
  public static async  isModerator(user_id:string, _premision?:Partial<TypeJsonRole>){
    return (await db.query().from(UserStore.table).select('*').where('user_id', user_id).andWhereNull('store_id').andWhere('type',USER_TYPE.MODERATOR).limit(1))[0] as UserStore|undefined;
  }
  public static async  isAdmin(user_id:string){
    return (await db.query().from(UserStore.table).select('*').where('user_id', user_id).andWhereNull('store_id').andWhere('type',USER_TYPE.ADMIN).limit(1))[0] as UserStore|undefined;
  }

  public static async  isSublymusManager(user_id:string ,_premision?:Partial<TypeJsonRole>){
    return (await db.query().from(UserStore.table).select('*').where('user_id', user_id).andWhereNull('store_id').andWhere((p)=>{
      p.where('type',USER_TYPE.MODERATOR).orWhere('type',USER_TYPE.ADMIN)
    }).limit(1))[0] as UserStore|undefined;
  }

  public static async  isClient(user_id:string, store_id:string, _premision?:Partial<TypeJsonRole>){
    return (await db.query().from(UserStore.table).select('*').where('user_id', user_id).andWhere('store_id', store_id).andWhere('type',USER_TYPE.CLIENT).limit(1))[0] as UserStore|undefined;
  }

  public static async  isStoreManagerOrMore(user_id:string, store_id?:string, _premision?:Partial<TypeJsonRole>){
    if(store_id){
      const u =  await UserStore.isStoreManager(user_id , store_id);
      if(u){
        console.log(u.type);
        return u
      }
    }
    return await UserStore.isSublymusManager(user_id);
  }

  public static parseUserStore(userStore:UserStore){
    const s = (userStore.$attributes|| userStore);
    return {...s,join_at : (s.createdAt|| s.created_at) }
  }
}

//