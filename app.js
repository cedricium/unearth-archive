const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const logger = require('morgan')

const apiBaseRouter = require('./api')

const app = express()
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use('/api/v1', apiBaseRouter)

app.get('/', (req, res) => {
  res.status(200).send(`${new Date().toLocaleString('en-US')} - Welcome! 👋`)
})

module.exports = app
