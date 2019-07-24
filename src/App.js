import React from 'react'
import './App.css'

import { Route } from 'react-router-dom'
import { ReceiveFromReddit, SendToReddit } from './components/OAuth'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'

const Login = () => <SendToReddit />
const Auth = () => <ReceiveFromReddit />

const App = () => {
  return (
    <div className="App">
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/auth/reddit" component={Auth} />
    </div>
  )
}

export default App
