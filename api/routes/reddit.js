const router = require('express').Router()
const axios = require('axios')
const qs = require('querystring')

/**
 * Endpoint for proxying client requests to Reddit's `/api/v1/access_token`
 * endpoint. Used to mask Reddit API keys (specifically the secret) since those
 * should not be used as environment variables in the client apps.
 *
 * References:
 *  - https://www.rockyourcode.com/secret-keys-in-react/
 *  - https://www.gatsbyjs.org/docs/environment-variables/#client-side-javascript
 *  - https://create-react-app.dev/docs/adding-custom-environment-variables/
 */
router.post('/access_token', async (req, res) => {
  try {
    const { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } = process.env
    const body = qs.stringify(req.body)

    const { data } = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      body,
      {
        auth: {
          username: REDDIT_CLIENT_ID,
          password: REDDIT_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'An error occurred while proxying the request to Reddit',
    })
  }
})

module.exports = router
