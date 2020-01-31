import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, navigate } from 'gatsby'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import ReceiveFromReddit from '../components/oauth/receive-from-reddit'

const Default = props => {
  /**
   * Default: path = '/app'
   * Entry point for the web app portion of tryunearth.com
   * Solely responsible for navigating either to the login page or the profile
   * page depending on whether the user is logged in or not.
   */
  if (props.isLoggedIn === true) {
    navigate('/app/profile')
    return null
  } else {
    navigate('/app/login')
    return null
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  hasCompletedOnboarding: state.onboarding.completed,
})

const ConnectedApp = connect(mapStateToProps)(Default)

const requireOnboardingComplete = ComposedComponent => {
  const Onboarded = props => {
    useEffect(() => {
      if (props.hasCompletedOnboarding === false) {
        return navigate('/app/onboarding')
      }
    }, [])

    return <ComposedComponent {...props} />
  }

  const mapStateToProps = state => ({
    hasCompletedOnboarding: state.onboarding.completed,
  })

  return connect(mapStateToProps)(Onboarded)
}

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  location,
  ...rest
}) => {
  if (!isLoggedIn && location.pathname !== `/app/login`) {
    navigate('/app/login')
    return null
  }
  return <Component {...rest} />
}

const WrappedPrivateRoute = connect(mapStateToProps)(PrivateRoute)

const Profile = () => <h1>Welcome, Ceddy</h1>
const Login = () => (
  <>
    <h1>Login</h1>
    <button>Get Started Using Reddit</button>
  </>
)

const AppPage = () => (
  <Layout>
    <Router>
      <WrappedPrivateRoute
        path='/app/profile'
        component={requireOnboardingComplete(Profile)}
      />
      <Login path='/app/login' />
      <ReceiveFromReddit path='/app/auth/reddit' />
      <ConnectedApp path='/app' />
    </Router>

    <Link to='/'>Go back to the homepage</Link>
  </Layout>
)

export default AppPage
