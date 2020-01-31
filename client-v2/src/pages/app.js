import React from 'react'
import { Link } from 'gatsby'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import PrivateRoute from '../components/private-route'
import ReceiveFromReddit from '../components/oauth/receive-from-reddit'
import Default from '../components/app-default'
import Onboarding from '../components/onboarding'
import Login from '../components/login'
import Profile from '../components/profile'

import requireOnboardingComplete from '../components/hoc/require-onboarding-complete'

const AppPage = () => (
  <Layout>
    <Router>
      <PrivateRoute path='/app/onboarding/*' component={Onboarding} />
      <PrivateRoute
        path='/app/profile'
        component={requireOnboardingComplete(Profile)}
      />
      <ReceiveFromReddit path='/app/auth/reddit' />
      <Login path='/app/login' />
      <Default path='/app' />
    </Router>

    <Link to='/'>Go back to the homepage</Link>
  </Layout>
)

export default AppPage
