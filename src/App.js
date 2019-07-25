import React from 'react'
import './App.css'

import { Route } from 'react-router-dom'
import { ReceiveFromReddit, SendToReddit } from './components/OAuth'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import SubredditDetail from './components/SubredditDetail'

const Login = () => <SendToReddit />
const Auth = () => <ReceiveFromReddit />

const App = () => {
  return (
    <div className="App">
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path={`/:prefix(r|u)/:subreddit`} component={SubredditDetail} />
      <Route path="/login" component={Login} />
      <Route path="/auth/reddit" component={Auth} />
    </div>
  )
}

export default App
