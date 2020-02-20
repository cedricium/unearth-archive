require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  test: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: 'postgres',
      password: 'postgres',
      database: 'unearth-test',
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
}
