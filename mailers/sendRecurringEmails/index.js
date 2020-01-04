const Email = require('email-templates')
const sendMail = require('../sendMail')

const mailOptions = async (address, locals) => {
  try {
    const email = new Email()
    const html = await email.render('newsletter/html', { things: locals })
    return {
      from: '"Cedric from Unearth" <hello@tryunearth.com>',
      to: address,
      subject: "Today's Hidden Gems",
      text: 'Plain-text email support coming soon!',
      html: html,
    }
  } catch (error) {
    console.error('Error processing email creation!')
    console.error(error)
  }
}

module.exports = async (address, data) => {
  const opts = await mailOptions(address, data)
  return sendMail(opts)
}
