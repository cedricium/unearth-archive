require('dotenv').config()
const app = require('./app')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 5000

const RedditService = require('./services/reddit')

io.on('connection', socket => {
  console.log(`[socket] client connected! - ${socket.id}`)
  let rs

  socket.on('client-connect', async data => {
    console.log(`[socket] client-connect`)
    const { id, username, refreshToken } = data
    rs = new RedditService({ id, username, refreshToken })
    socket.emit('client-connection', { status: 'success' })
  })

  socket.on('check-sync-status', async data => {
    console.log(`[socket] check-sync-status`)
    const userSyncStatus = await rs.checkSyncStatus()
    socket.emit('sync-status', userSyncStatus)
  })

  socket.on('sync-reddit-saves', async data => {
    console.log(`[socket] sync-reddit-saves`)
    const { has_synced_with_reddit, sync_status } = await rs.checkSyncStatus()
    if (has_synced_with_reddit) {
      socket.emit('sync-status', { has_synced_with_reddit, sync_status })
    } else {
      const userSyncStatus = await rs.syncRedditSaves()
      socket.emit('sync-status', userSyncStatus)
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
