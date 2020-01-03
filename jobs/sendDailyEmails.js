const FREQUENCY = 'daily'
const db = require('../database/config')
const sendRecurringEmails = require('../mailers/sendRecurringEmails')

const run = async () => {
  const users = await db.table('users').where({ frequency: FREQUENCY })
  for (let user of users) {
    const data = await db
      .table('things')
      .where({
        user_id: user.id,
        surfaced: false,
      })
      .whereNotNull('title')
      .limit(5)
    await sendRecurringEmails(user.email, data)
    for (let d of data) {
      await db('things')
        .where({ id: d.id })
        .update({ surfaced: true })
    }
  }
  await db.destroy()
}
run().catch(error => {
  console.log(error)
  db.destroy()
  process.exit(1)
})
