const hmacSHA256 = require('crypto-js/hmac-sha256')
const base64 = require('crypto-js/enc-base64')
const base64url = require('base64url')

const SECRET = process.env.SECRET || 'secret hash string'

const generateHash = message => {
  const hash = hmacSHA256(message, SECRET)
  const encodedHash = base64.stringify(hash)
  return base64url.fromBase64(encodedHash)
}

module.exports = { generateHash }
