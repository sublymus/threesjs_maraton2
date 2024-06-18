import env from '#start/env';
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
console.log();


const dbConfig = defineConfig({
  connection: 'sqlite',
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: `${env.get('DIR_NAME')}/db.sqlite3`/* app.tmpPath('db.sqlite3') */
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig