const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const apiBaseRouter = require('./api')

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use('/api/v1', apiBaseRouter)

app.get('/', (req, res) => {
  res.send(`${new Date().toLocaleString('en-US')} - Welcome! 👋`)
})

module.exports = app
