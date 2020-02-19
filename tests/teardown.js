const db = require('../database/config')

/**
 * Reset the db after each test suite runs
 */
const teardown = async () => {
  await db.migrate.rollback({ all: true })
  await db.migrate.latest()
  await db.seed.run()
  await db.destroy()
}

module.exports = teardown
