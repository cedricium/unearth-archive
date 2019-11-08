const nodemailer = require('nodemailer')
const db = require('../database/config')
const Email = require('email-templates')

/**
 * Boilerplate for sending mail using nodemailer + Sendgrid SMTP server.
 * References:
 *  - https://scotch.io/tutorials/nodejs-cron-jobs-by-examples#toc-use-case-3-sending-emails-every-n-time-interval
 */
const sendMail = async (frequency = 'daily') => {
  try {
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

    // get all users who's preference match the current period
    // maybe an inner join will work best
    const users = await db.table('users').where({ frequency })

    // forEach user...
    // get data from DB
    for (let user of users) {
      const data = await db
        .table('things')
        .where({
          user_id: user.id,
          surfaced: false,
        })
        .limit(4)

      /**
       * Featured Thing
       *
       *  - 1 post or comment (first one displayed)
       *  - thing cannot be nsfw
       *  - must have image / media associated with it
       *  - display said image full width above it's thing
       *
       * Image path in saved.json to be used:
       *  preview
       *  ↳ images
       *    ↳ 0
       *      ↳ source
       *        ↳ url
       *
       * After basic implementation, things to fix:
       *  - [ ] duplicate things (featured and one in `data`)
       *    - solution: `id` not in data ids
       *  - [ ] need padding below image
       *  - [ ] no featured thing, so `index === 0` check shows 1st of 4 data's image (which could be nsfw)
       *    - solution: featured thing as its own prop in the `email.render` function below
       *        1. find a featured thing (if any)
       *            - thumbnail != null
       *            - surfaced = false
       *            - over_18 = false
       *        2. get 4 things (if no featured, else 5)
       *            - thing.id != featured.id
       *        3. update html.pug, eliminating index = 0 and creating a separate space for the featured thing
       *           if it exists
       */
      const featuredThing = await db
        .table('things')
        .where({
          user_id: user.id,
          over_18: false,
          surfaced: false,
        })
        .whereNotNull('thumbnail')
        .limit(1)

      const email = new Email({})
      const html = await email.render('unearth/html', {
        things: [...featuredThing, ...data],
      })

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Cedric from Unearth" <hello@tryunearth.com>', // sender address
        to: user.email, // list of receivers
        subject: `Today's Hidden Gems`, // Subject line
        text: 'Hello, world!', // plain text body
        html,
      })

      for (let d of [...featuredThing, ...data]) {
        await db('things')
          .where({ id: d.id })
          .update({ surfaced: true })
      }

      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      if (process.env.NODE_ENV !== 'production') {
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
    }
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

sendMail().catch(err => console.error(err))
