const express = require('express')
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const db = require('./database/config')
const Email = require('email-templates')

const app = express()

// Example found from the below Scotch.io blog post:
// https://scotch.io/tutorials/nodejs-cron-jobs-by-examples#toc-use-case-3-sending-emails-every-n-time-interval
cron.schedule('* * * * *', async () => {
  let transporter
  if (process.env.NODE_ENV !== 'production') {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SENDGRID_SMTP_HOST,
      port: process.env.SENDGRID_SMTP_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SENDGRID_SMTP_USERNAME,
        pass: process.env.SENDGRID_SMTP_PASSWORD,
      },
    })
  }

  // get data from DB
  const data = await db
    .table('things')
    .where({ user_id: 1, surfaced: false })
    .limit(10)

  const email = new Email()
  const html = await email.render('unearth/html', {
    things: data,
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Cedric from Unearth" <hello@tryunearth.com>', // sender address
    to: 'amaya.cedric@gmail.com', // list of receivers
    subject: '💎 Your Hidden Gems', // Subject line
    text: 'Hello, world!', // plain text body
    html,
  })

  data.forEach(async d => {
    await db('things')
      .where({ id: d.id })
      .update({ surfaced: true })
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  if (process.env.NODE_ENV !== 'production') {
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
})

app.get('/', (req, res) => {
  res.send(`${new Date().toLocaleString('en-US')} - Welcome! 👋`)
})

module.exports = app
