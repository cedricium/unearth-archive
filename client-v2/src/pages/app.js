import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import PrivateRoute from '../components/private-route'
import ReceiveFromReddit from '../components/oauth/receive-from-reddit'
import Default from '../components/app-default'
import Onboarding from '../components/onboarding'
import Login from '../components/login'
import Account from '../components/account'

import requireOnboardingComplete from '../components/hoc/require-onboarding-complete'

import AppGlobalStyle from '../styles/app.styles'

const AppPage = () => (
  <Layout hideHeader maxWidth={960}>
    <AppGlobalStyle />
    <Router>
      <PrivateRoute path='/app/onboarding/*' component={Onboarding} />
      <PrivateRoute
        path='/app/account'
        component={requireOnboardingComplete(Account)}
      />
      <ReceiveFromReddit path='/app/auth/reddit' />
      <Login path='/app/login' />
      <Default path='/app' />
    </Router>
  </Layout>
)

export default AppPage
