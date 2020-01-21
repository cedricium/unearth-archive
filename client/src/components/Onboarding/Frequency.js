import React from 'react'
import { connect } from 'react-redux'
import { UPDATE_FREQUENCY_PREF } from '../../actions'
import Navigation from './utils/Navigation'

const handleChange = (e, props) => {
  props.dispatch({
    type: UPDATE_FREQUENCY_PREF,
    payload: e.target.value,
  })
}

const Frequency = props => {
  return (
    <div className='step_2'>
      <h1>Step 2</h1>
      <p>When would you like to receive your personalized emails?</p>
      <form>
        <div>
          <input
            type='radio'
            name='frequency'
            id='daily'
            value='daily'
            checked={props.data.newsletterFrequency === 'daily'}
            onChange={e => handleChange(e, props)}
          />
          <label htmlFor='daily'>Daily</label>
        </div>
        <div>
          <input
            type='radio'
            name='frequency'
            id='weekly'
            value='weekly'
            checked={props.data.newsletterFrequency === 'weekly'}
            onChange={e => handleChange(e, props)}
          />
          <label htmlFor='weekly'>Weekly</label>
        </div>
        <div>
          <input
            type='radio'
            name='frequency'
            id='monthly'
            value='monthly'
            checked={props.data.newsletterFrequency === 'monthly'}
            onChange={e => handleChange(e, props)}
          />
          <label htmlFor='monthly'>Monthly</label>
        </div>
      </form>
      <Navigation />
    </div>
  )
}

const mapStateToProps = state => ({
  data: state.onboarding.data,
})

export default connect(mapStateToProps)(Frequency)
