import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  /**
   * Default connection used for all queries.
   */
  connection: 'mysql',

  connections: {
    /**
     * MySQL / MariaDB connection.
     * Install package to switch: npm install mysql2
     */
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('MYSQL_PORT'),
        user: env.get('MYSQL_USER'),
        password: env.get('MYSQL_PASSWORD'),
        database: env.get('MYSQL_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      debug: app.inDev,
    },
  },
})

export default dbConfig
