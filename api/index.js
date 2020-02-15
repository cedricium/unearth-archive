const router = require('express').Router()
const cors = require('cors')

const usersRouter = require('./routes/users')
const unsubscribeRouter = require('./routes/unsubscribe')
const redditProxyRouter = require('./routes/reddit')

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'production') {
      // Test to ensure `origin` is the true hostname, subdomain, or
      // subdirectory of our client's "tryunearth.com" website. To see this
      // regular expression in action, visit: https://regexr.com/4pvv3
      const allowedOrigin = RegExp(/tryunearth\.com($|\/+)/gi)
      if (allowedOrigin.test(origin)) {
        callback(null, true)
      } else {
        callback(`Origin not allowed by CORS`)
      }
    } else {
      callback(null, true)
    }
  },
}

router.use('/users', cors(corsOptions), usersRouter)
router.use('/unsubscribe', unsubscribeRouter)
router.use('/reddit', cors(corsOptions), redditProxyRouter)

// Simple health check
router.get('/status', (req, res) => res.status(200).json({ status: 'success' }))

module.exports = router
