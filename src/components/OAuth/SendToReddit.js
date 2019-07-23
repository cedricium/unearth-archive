import React from 'react'
import { OauthSender } from 'react-oauth-flow'

const SendToReddit = () => {
  return (
    <OauthSender
      authorizeUrl={process.env.REACT_APP_AUTHORIZATION_URL}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri="http://localhost:3000/auth/reddit"
      response_type="token"
      state={{ from: '/' }}
      args={{ scope: "history identity", duration: 'permanent' }}
      render={({ url }) => <a href={url}>Log in with Reddit</a>}
    />
  )
}

export default SendToReddit
