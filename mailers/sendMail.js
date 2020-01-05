const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SENDGRID_SMTP_HOST,
  port: process.env.SENDGRID_SMTP_PORT,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  auth: {
    user: process.env.SENDGRID_SMTP_USERNAME,
    pass: process.env.SENDGRID_SMTP_PASSWORD,
  },
})

module.exports = async mailOptions => {
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.error('An error occurred while attempting to send the email!')
    console.error(error)
  }
}
