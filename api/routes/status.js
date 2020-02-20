const router = require('express').Router()

// Simple health check
router.get('/', (req, res) => res.status(200).json({ status: 'success' }))

module.exports = router
