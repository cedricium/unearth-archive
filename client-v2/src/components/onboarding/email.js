import React from 'react'
import { connect } from 'react-redux'

import Navigation from './utils/navigation'
import { UPDATE_EMAIL } from '../../redux/actions'

const Email = props => (
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

const mapStateToProps = state => ({
  data: state.onboarding.data,
})

export default connect(mapStateToProps)(Email)
