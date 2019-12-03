import React from 'react'
import { OauthSender } from 'react-oauth-flow'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000'

const SendToReddit = props => {
  if (props.auth.isLoggedIn) {
    if (props.hasCompletedOnboarding) {
      return <Redirect to='/onboarding/success' />
    } else {
      return <Redirect to='/onboarding' />
    }
  }
  return (
    <OauthSender
      authorizeUrl={process.env.REACT_APP_AUTHORIZATION_URL}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={`${CLIENT_URL}/auth/reddit`}
      response_type='token'
      state={{ from: '/' }}
      args={{ scope: 'history identity', duration: 'permanent' }}
      render={({ url }) => <a href={url}>Log in with Reddit</a>}
    />
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  hasCompletedOnboarding: state.onboarding.completed,
})

export default connect(mapStateToProps)(SendToReddit)
