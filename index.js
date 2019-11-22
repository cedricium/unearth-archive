require('dotenv').config()
const app = require('./app')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 5000

const RedditService = require('./services/reddit')

io.on('connection', socket => {
  console.log(`[socket] client connected! - ${socket.id}`)
  socket.on('check-sync-status', async data => {
    console.log(`[socket] check-sync-status`)
    const userSyncStatus = await RedditService.checkSyncStatus(data)
    socket.emit('sync-status', userSyncStatus)
  })

  socket.on('sync-reddit-saves', async data => {
    // moved up and instantiated in `socket.on('connection')`
    const rs = new RedditService({
      id: 'a9cqu',
      username: 'Cedricium',
      refreshToken: '17232582-g73iP6YNiVvMhf7XWB1hZ3AufiQ',
    })

    const userSyncStatus = await rs.syncRedditSaves()
    socket.emit('sync-status', userSyncStatus)
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
