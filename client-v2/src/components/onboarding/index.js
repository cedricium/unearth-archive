import React from 'react'
import { Router } from '@reach/router'

import Welcome from './welcome'
import Email from './email'
import Frequency from './frequency'
import Sync from './sync'
import Success from './success'

const Onboarding = () => (
  <div>
    <h1>Onboarding</h1>
    <Router>
      <Welcome path='/' />
      <Email path='email' />
      <Frequency path='frequency' />
      <Sync path='sync' />
      <Success path='success' />
    </Router>
  </div>
)

export default Onboarding
