const Email = require('email-templates')
const sendMail = require('../sendMail')
const { generateHash } = require('../../utils')

const mailOptions = async (address, locals) => {
  try {
    const email = new Email()
    const html = await email.render('newsletter/html', locals)
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
  const things = data
  const unsubscribeData = {
    email: address,
    hash: generateHash(address),
  }
  const opts = await mailOptions(address, { things, unsubscribeData })
  return sendMail(opts)
}
