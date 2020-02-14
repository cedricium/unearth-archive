const router = require('express').Router()
const usersRouter = require('./routes/users')
const redditProxyRouter = require('./routes/reddit')

router.use('/users', usersRouter)
router.use('/reddit', redditProxyRouter)

// Simple health check
router.get('/status', (req, res) => {
  res.status(200).json({})
})

module.exports = router
