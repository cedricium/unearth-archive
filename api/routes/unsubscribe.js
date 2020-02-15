const router = require('express').Router()
const db = require('../../database/config')
const { generateHash } = require('../../utils')

router.get('/', async (req, res) => {
  try {
    const { email, hash } = req.query
    if (!email || !hash) {
      return res.status(400).json({
        error: 'Missing required params in order to complete the request',
      })
    }
    if (hash === generateHash(email)) {
      // hash matches, continue with unsubscribe process
      await db('users')
        .where({ email })
        .update({ frequency: 'unsubscribe' })
      return res
        .status(200)
        .send(
          'Thanks for trying Unearth. You have successfully been unsubscribed.',
        )
    } else {
      // something went wrong with the hash checking, do not continue
      return res
        .status(400)
        .send(
          'Hmm, looks like something is wrong with your unsubscribe link. ' +
            'Please try again then contact <a href="mailto:support@tryunearth.com">support@tryunearth.com</a>' +
            ' if the problem persists.',
        )
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'An error occurred while processing your request.',
    })
  }
})

module.exports = router
