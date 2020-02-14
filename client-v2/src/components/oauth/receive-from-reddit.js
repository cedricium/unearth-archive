import React from 'react'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { OauthReceiver } from 'react-oauth-flow'
import qs from 'querystring'
import axios from 'axios'

import { retrieveRedditorInfo, registerUser } from '../../redux/actions'

const CLIENT_URL = process.env.GATSBY_CLIENT_URL || 'http://localhost:8000'

const ReceiveFromReddit = props => {
  const handleSuccess = async (accessToken, { response, state }) => {
    const { access_token, refresh_token } = response
    await props.retrieveRedditorInfo({
      accessToken: access_token,
      refreshToken: refresh_token,
    })
    await props.registerUser()
    redirect('/app')
  }

  const handleError = (error, state) => {
    console.error('An error occurred')
    console.error(error, state)
  }

  const fetchToken = async (url, tokenFetchArgs) => {
    try {
      const { code } = qs.parse(window.location.search)
      const body = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${CLIENT_URL}/app/auth/reddit`,
      }

      const BACKEND_API_URL = process.env.GATSBY_BACKEND_API_URL
      const redditProxyAccessTokenUrl = `${BACKEND_API_URL}/reddit/access_token`
      const { data } = await axios.post(redditProxyAccessTokenUrl, body)

      return data
    } catch (error) {
      throw error
    }
  }

  const redirect = to => navigate(to)

  return (
    <OauthReceiver
      tokenUrl='https://www.reddit.com/api/v1/access_token'
      clientId={process.env.GATSBY_CLIENT_ID}
      clientSecret='_'
      redirectUri={`${CLIENT_URL}/app/auth/reddit`}
      tokenFetchArgs={{}}
      tokenFn={fetchToken}
      onAuthSuccess={handleSuccess}
      onAuthError={handleError}
      render={({ processing, state, error }) => (
        <div>
          {processing && <p>Authorizing now...</p>}
          {error && <p className='error'>An error occurred: {error.message}</p>}
        </div>
      )}
    />
  )
}

export default connect(null, { retrieveRedditorInfo, registerUser })(
  ReceiveFromReddit,
)
