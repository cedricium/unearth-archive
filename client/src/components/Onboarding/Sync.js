import React from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import Navigation from './utils/Navigation'

const Sync = props => {
  // if (props.successful) {
  //   return <Redirect to='/onboarding/success' />
  // }
  return (
    <div className='step_3'>
      <h3>Step 3</h3>
      <p>
        Let's sync your saved things. When you're ready, click the button below.
      </p>
      <p>
        <small>
          Note: this may take a few moments depending on the number of things
          you have saved. Do not close this tab or refresh the page.
        </small>
      </p>
      {/* <button disabled={props.isFetching} onClick={() => props.getThings()}>
        {props.isFetching ? 'Syncing...' : 'Sync Reddit Saves'}
      </button> */}
      <p>{props.error && props.error}</p>
      <Navigation />
    </div>
  )
}

// const mapStateToProps = state => ({
//   error: state.error,
//   isFetching: state.things.isFetching,
//   successful: state.things.successful,
// })

export default connect(/* mapStateToProps */)(Sync)
