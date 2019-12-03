const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const apiBaseRouter = require('./api')

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'production') {
      if (origin === 'https://www.tryunearth.com/') {
        callback(null, true)
      } else {
        callback(`Origin not allowed by CORS`)
      }
    } else {
      callback(null, true)
    }
  },
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(bodyParser.json())
app.use('/api/v1', apiBaseRouter)

app.get('/', (req, res) => {
  res.send(`${new Date().toLocaleString('en-US')} - Welcome! 👋`)
})

module.exports = app
