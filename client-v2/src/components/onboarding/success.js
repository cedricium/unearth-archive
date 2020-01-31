import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'gatsby'

const Success = () => {
  return (
    <div>
      <h2>Success!</h2>
      <Link to='/app/profile'>View Dashboard</Link>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Success)
