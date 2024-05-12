import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 } from 'uuid'


export enum USER_TYPE {
  CLIENT = 'CLIENT',
  COLLABORATOR = 'COLLABORATOR',
  OWNER = 'OWNER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN'
}
export enum USER_STATUS {
  NEW = 'NEW',
  VISIBLE = 'VISIBLE'
}

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare status: string

  @column()
  declare password: string

  @column()
  declare phone: string | null

  @column()
  declare photos: string | null

  @column()
  declare address_id: string | null


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  public static async setUUID (user: User) {
   if(!user.id)user.id = v4()
  }

  public static ParseUser(user: User) {
    let photos = [];
    try {
      photos = JSON.parse(user.photos || '[]')
    } catch (error) { console.error(error);
     }
    return {
      ...(user.$attributes||user),
      photos,
      password: undefined,
    } as any as User['$attributes']
  }
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}