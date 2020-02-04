import React from 'react'
import { Router } from '@reach/router'
import { createGlobalStyle } from 'styled-components'

import Layout from '../components/layout'
import PrivateRoute from '../components/private-route'
import ReceiveFromReddit from '../components/oauth/receive-from-reddit'
import Default from '../components/app-default'
import Onboarding from '../components/onboarding'
import Login from '../components/login'
import Profile from '../components/profile'

import requireOnboardingComplete from '../components/hoc/require-onboarding-complete'

const AppGlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css');

  /**
   * Water.css overrides can go below. For additional information, checkout the
   * Water.css GitHub page.
   *
   * References:
   *  - https://github.com/kognise/water.css?ref=devawesome.io#theming
   */

  :root {
    --background-body: #fff;
    --background: #efefef;
    --background-alt: #f7f7f7;
    --selection: #9e9e9e;
    --text-main: #363636;
    --text-bright: #000;
    --text-muted: #999;
    --links: #0076d1;
    --focus: #0096bfab;
    --border: #dbdbdb;
    --code: #000;
    --animation-duration: 0.1s;
    --button-hover: #ddd;
    --scrollbar-thumb: color-mod(var(--button-hover) lightness(-3%));
    --scrollbar-thumb-hover: color-mod(var(--button-hover) lightness(-10%));
    --form-placeholder: #949494;
    --form-text: #000;
    --variable: #39a33c;
    --highlight: #ff0;
  }

  body {
    margin: 0;
    padding: 0;
    max-width: none;
  }
`

const AppPage = () => (
  <Layout hideHeader>
    <AppGlobalStyle />
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
  </Layout>
)

export default AppPage
