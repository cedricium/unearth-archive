import React from 'react'
import { OauthSender } from 'react-oauth-flow'

const CLIENT_URL = process.env.GATSBY_CLIENT_URL || 'http://localhost:8000'
const SendToReddit = ({ component: Anchor, value }) => {
  return (
    <OauthSender
      authorizeUrl={process.env.GATSBY_AUTHORIZATION_URL}
      clientId={process.env.GATSBY_CLIENT_ID}
      redirectUri={`${CLIENT_URL}/app/auth/reddit`}
      response_type='token'
      state={{ from: '/' }}
      args={{ scope: 'history identity', duration: 'permanent' }}
      render={({ url }) => (
        <Anchor primary href={url}>
          {value}
        </Anchor>
      )}
    />
  )
}

export default SendToReddit
