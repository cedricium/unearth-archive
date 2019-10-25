const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`${new Date().toLocaleString('en-US')} - Welcome! 👋`)
})

module.exports = app
