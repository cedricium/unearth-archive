import React from 'react'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { OauthReceiver } from 'react-oauth-flow'
import qs from 'querystring'

import { retrieveRedditorInfo, registerUser } from '../../redux/actions'

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL || 'http://localhost:8000'

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

  const fetchToken = (url, tokenFetchArgs) => {
    const { code } = qs.parse(window.location.search)
    const accessTokenUrl = process.env.REACT_APP_ACCESS_TOKEN_URL
    const body = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${CLIENT_URL}/app/auth/reddit`,
    }
    const request = fetch(accessTokenUrl, {
      ...tokenFetchArgs,
      body: qs.stringify(body),
    })
    return request
      .then(response => {
        if (!response.ok) throw response
        return response.json()
      })
      .catch(
        err => console.error(err),
        // err.json().then(errJSON => {
        //   const error = new Error(err.statusText)
        //   throw error
        // }),
      )
  }

  const redirect = to => navigate(to)

  const bearerToken = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
  )
  return (
    <OauthReceiver
      tokenUrl='https://www.reddit.com/api/v1/access_token'
      clientId={process.env.REACT_APP_CLIENT_ID}
      clientSecret={process.env.REACT_APP_CLIENT_SECRET}
      redirectUri={`${CLIENT_URL}/app/auth/reddit`}
      tokenFetchArgs={{
        method: 'POST',
        headers: {
          Authorization: `Basic ${bearerToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }}
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
