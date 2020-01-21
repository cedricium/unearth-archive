import React from 'react'
import { connect } from 'react-redux'
import { UPDATE_EMAIL } from '../../actions'
import Navigation from './utils/Navigation'

const Email = props => {
  return (
    <div className='step_1'>
      <h1>Step 1</h1>
      <p>What is your email address?</p>
      <form>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='snoo@reddit.com'
          value={props.data.emailAddress}
          onChange={e => {
            e.preventDefault()
            props.dispatch({
              type: UPDATE_EMAIL,
              payload: e.target.value,
            })
          }}
        />
      </form>
      <Navigation />
    </div>
  )
}

const mapStateToProps = state => ({
  data: state.onboarding.data,
})

export default connect(mapStateToProps)(Email)
