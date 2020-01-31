import React from 'react'
import { OauthSender } from 'react-oauth-flow'

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL || 'http://localhost:8000'
const SendToReddit = () => {
  return (
    <OauthSender
      authorizeUrl={process.env.REACT_APP_AUTHORIZATION_URL}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={`${CLIENT_URL}/app/auth/reddit`}
      response_type='token'
      state={{ from: '/' }}
      args={{ scope: 'history identity', duration: 'permanent' }}
      render={({ url }) => {
        console.log(url)
        return <a href={url}>Log in with Reddit</a>
      }}
      // render={({ url }) => <Landing url={url} />}
    />
  )
}

export default SendToReddit
