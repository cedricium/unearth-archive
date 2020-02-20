const db = require('../database/config')

const teardown = async () => await db.destroy()

module.exports = teardown
