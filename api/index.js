const router = require('express').Router()
const usersRouter = require('./routes/users')

router.use('/users', usersRouter)

// Simple health check
router.get('/status', (req, res) => {
  res.status(200).json({})
})

module.exports = router
