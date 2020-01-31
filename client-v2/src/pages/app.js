import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, navigate } from 'gatsby'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import SendToReddit from '../components/oauth/send-to-reddit'
import ReceiveFromReddit from '../components/oauth/receive-from-reddit'
import { updateOnboardingStatus } from '../redux/redux-wrapper'

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
    }, [props.hasCompletedOnboarding])

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
    <SendToReddit />
  </>
)

const Welcome = () => (
  <div>
    <h2>Welcome to Unearth!</h2>
    <Link to='/app/onboarding/email'>Let's Begin</Link>
  </div>
)

const Email = () => (
  <div>
    <h2>Step 1: Email</h2>
    <Link to='/app/onboarding/frequency'>Next</Link>
  </div>
)

const Frequency = () => (
  <div>
    <h2>Step 2: Frequency</h2>
    <Link to='/app/onboarding/email'>Previous</Link>
    <Link to='/app/onboarding/sync'>Next</Link>
  </div>
)

const Sync = () => (
  <div>
    <h2>Step 3: Sync</h2>
    <Link to='/app/onboarding/frequency'>Previous</Link>
    <Link to='/app/onboarding/success'>Submit</Link>
  </div>
)

const Success = props => {
  useEffect(() => {
    props.updateOnboardingStatus()
  }, [props])
  return (
    <div>
      <h2>Success!</h2>
      <Link to='/app/profile'>View Dashboard</Link>
    </div>
  )
}

const ConnectedSuccess = connect(null, { updateOnboardingStatus })(Success)

const Onboarding = () => (
  <div>
    <h1>Onboarding</h1>
    <Router>
      <Welcome path='/' />
      <Email path='email' />
      <Frequency path='frequency' />
      <Sync path='sync' />
      <ConnectedSuccess path='success' />
    </Router>
  </div>
)

const AppPage = () => (
  <Layout>
    <Router>
      <WrappedPrivateRoute
        path='/app/profile'
        component={requireOnboardingComplete(Profile)}
      />
      <WrappedPrivateRoute path='/app/onboarding/*' component={Onboarding} />
      <Login path='/app/login' />
      <ReceiveFromReddit path='/app/auth/reddit' />
      <ConnectedApp path='/app' />
    </Router>

    <Link to='/'>Go back to the homepage</Link>
  </Layout>
)

export default AppPage
