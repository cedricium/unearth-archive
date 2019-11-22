const express = require('express')
const app = express()
const apiBaseRouter = require('./api')

app.use('/api/v1', apiBaseRouter)

app.get('/', (req, res) => {
  res.send(`${new Date().toLocaleString('en-US')} - Welcome! 👋`)
})

module.exports = app
