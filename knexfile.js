require('dotenv').config()

console.log(
  `KNEXFILE.JS\npostgres://postgres:postgres@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/unearth-test\n`,
)

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
    connection: `postgres://postgres:postgres@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/unearth-test`,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
}
