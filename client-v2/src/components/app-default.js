import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

const AppDefault = props => {
  /**
   * Default: path = '/app'
   * Entry point for the web app portion of tryunearth.com
   * Solely responsible for navigating either to the login page (really the
   * landing page with login button) or the account page depending on whether
   * the user is logged in or not.
   */
  if (props.isLoggedIn) {
    return <Redirect noThrow to='/app/account' />
  }
  return <Redirect noThrow to='/' />
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  hasCompletedOnboarding: state.onboarding.completed,
})

export default connect(mapStateToProps)(AppDefault)
