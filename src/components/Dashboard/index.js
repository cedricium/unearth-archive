import React from 'react'
import { connect } from 'react-redux'
import { getThings } from '../../actions'

const Dashboard = props => (
  <main>
    <h2>Welcome, {props.username}!</h2>
    <button onClick={props.getThings}>Sync Saved Things</button>
  </main>
)

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  username: state.user.username,
})

export default connect(mapStateToProps, { getThings })(Dashboard)
