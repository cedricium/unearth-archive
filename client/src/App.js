import React from 'react'

import { Route } from 'react-router-dom'
import { ReceiveFromReddit, SendToReddit } from './components/OAuth'
import { OnboardingWizard } from './components/Onboarding'

const Login = () => <SendToReddit />
const Auth = () => <ReceiveFromReddit />

const App = () => {
  return (
    <div className='App'>
      <Route exact path='/' component={Login} />
      <Route path='/auth/reddit' component={Auth} />
      <Route path='/onboarding' component={OnboardingWizard} />
    </div>
  )
}

export default App
