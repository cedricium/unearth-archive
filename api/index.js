const router = require('express').Router()

// Simple health check
router.get('/status', (req, res) => {
  res.status(200).json({})
})

module.exports = router
