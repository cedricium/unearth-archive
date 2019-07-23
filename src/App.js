import React from 'react'
import './App.css'

import { Route } from 'react-router-dom'
import { ReceiveFromReddit, SendToReddit } from './components/OAuth'

import { connect } from 'react-redux'
import { getThings } from './actions'

const Login = () => <SendToReddit />
const Auth = () => <ReceiveFromReddit />
const Dashboard = props => (
  <main>
    <h2>Welcome, {props.username}!</h2>
    <button onClick={props.getThings}>Sync Saved Things</button>
  </main>
)

const App = props => {
  return (
    <div className="App">
      {props.isLoggedIn && (
        <Dashboard username={props.username} getThings={props.getThings} />
      )}
      <Login />
      <Route path="/auth/reddit" component={Auth} />
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  username: state.user.username,
})

export default connect(mapStateToProps, { getThings })(App)
