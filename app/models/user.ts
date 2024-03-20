import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 } from 'uuid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare full_name: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare phone: string | null

  @column()
  declare photos: string | null

  @column()
  declare provider_id: string | null

  @column()
  declare address_id: string | null

  @column()
  declare admin_id: string | null

  @column()
  declare client: string | null

  @column()
  declare service: string | null

  @column()
  declare engineer: string | null

  @column()
  declare collaborator: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  public static async setUUID (user: User) {
   if(!user.id)user.id = v4()
  }
  static accessTokens = DbAccessTokensProvider.forModel(User,{
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}