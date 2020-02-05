import React from 'react'
import { OauthSender } from 'react-oauth-flow'

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL || 'http://localhost:8000'
const SendToReddit = ({ component: Anchor }) => {
  return (
    <OauthSender
      authorizeUrl={process.env.REACT_APP_AUTHORIZATION_URL}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={`${CLIENT_URL}/app/auth/reddit`}
      response_type='token'
      state={{ from: '/' }}
      args={{ scope: 'history identity', duration: 'permanent' }}
      render={({ url }) => <Anchor href={url}>Get Started Using Reddit</Anchor>}
    />
  )
}

export default SendToReddit
