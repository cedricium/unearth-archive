import axios from 'axios'
import io from 'socket.io-client'

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL
const BACKEND_SOCKET_URL = process.env.REACT_APP_BACKEND_SOCKET_URL

const socket = io(BACKEND_SOCKET_URL)

export const updateUserInfo = async ({ id, email, frequency }) => {
  try {
    await axios.patch(
      `${BACKEND_API_URL}/users/${id}?onboarding-success=true`,
      { email, frequency },
    )
  } catch (error) {
    console.error(error)
  }
}

export const connectClient = (userInfo, callback) => {
  if (socket.disconnected) {
    socket.open()
  }
  socket.emit('client-connect', userInfo)
  socket.on('client-connection', ack => {
    callback(null, ack)
  })
}

export const checkSyncStatus = callback => {
  socket.emit('check-sync-status')
  socket.on('sync-status', ack => {
    callback(null, ack)
  })
}

export const syncRedditSaves = callback => {
  socket.emit('sync-reddit-saves')
  socket.on('sync-status', ack => {
    callback(null, ack)
  })
}

/**
 * Socket cleanup utility. Removes all event listeners for the given socket
 * then disconnects the socket. Used when the calling component unmounts.
 */
export const closeConnection = () => {
  socket.off('sync-status')
  socket.off('client-connection')
  socket.disconnect()
}
