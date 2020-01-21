import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import SyncLoader from 'react-spinners/SyncLoader'
import Navigation from './utils/Navigation'
import { updateOnboardingStatus } from '../../actions'
import {
  closeConnection,
  connectClient,
  checkSyncStatus,
  syncRedditSaves,
  updateUserInfo,
} from '../../utils/api'

const Sync = props => {
  const { id, username, refreshToken, email, frequency, history } = props

  const [isConnected, setIsConnected] = useState(false)
  const [hasSyncedWithReddit, setHasSyncedWithReddit] = useState(false)
  const [syncStatus, setSyncStatus] = useState('not-started')

  // Empty dependency array passed as second argument effectively means this
  // `useEffect` function will only be triggered when this component mounts.
  // Reference: https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    connectClient({ id, username, refreshToken }, (error, response) => {
      if (response && response.status === 'success') {
        setIsConnected(true)
      }
    })
    // Returning a function from inside the `useEffect` function enables the
    // optional cleanup mechanism. Necessary in this case to remove socket.io
    // event listeners and disconnect the socket when the component unmounts.
    return closeConnection
  }, [])

  useEffect(() => {
    checkSyncStatus((error, response) => updateSyncStatus(response))
  }, [isConnected])

  const syncSaves = () => {
    setSyncStatus('in-progress')
    syncRedditSaves((error, response) => {
      updateSyncStatus(response)
    })
  }

  const updateSyncStatus = response => {
    const { has_synced_with_reddit, sync_status } = response
    setHasSyncedWithReddit(has_synced_with_reddit)
    setSyncStatus(sync_status)
  }

  const completeOnboarding = async () => {
    await updateUserInfo({ id, email, frequency })
    props.updateOnboardingStatus()
    history.push('/onboarding/success')
  }

  if (!isConnected) return <p>Loading...</p>

  return (
    <div className='step_3'>
      <h1>Step 3</h1>
      <p>
        Let's sync your saved things. When you're ready, click the button below.
      </p>
      <p>
        <small>
          Note: this may take a few moments depending on the number of things
          you have saved. Do not close this tab or refresh the page.
        </small>
      </p>
      {syncStatus === 'in-progress' && (
        <SyncLoader size={8} sizeUnit={'px'} loading={true} />
      )}
      <button
        style={{ display: syncStatus === 'not-started' ? 'block' : 'none' }}
        onClick={() => syncSaves()}
      >
        Sync Reddit Saves
      </button>
      <button
        style={{ display: syncStatus === 'successful' ? 'block' : 'none' }}
        onClick={completeOnboarding}
      >
        Submit
      </button>
      <div
        className='debugging-info'
        style={{
          display: process.env.NODE_ENV === 'production' ? 'none' : 'block',
        }}
      >
        {/*
         * Hide this simple debugging section when in production. If users face
         * issues when in prod, can have them paste the following and report the
         * error:
         *    document.querySelector('.debugging-info').style.display = 'block'
         */}
        <p>Current Sync Status: {syncStatus && syncStatus}</p>
        <p>
          {syncStatus === 'failed' &&
            'An error occurred while syncing your saves!'}
        </p>
      </div>
      <Navigation />
    </div>
  )
}

const mapStateToProps = state => ({
  id: state.user.id,
  username: state.user.username,
  refreshToken: state.auth.refreshToken,
  email: state.onboarding.data.emailAddress,
  frequency: state.onboarding.data.newsletterFrequency,
})

export default connect(mapStateToProps, { updateOnboardingStatus })(Sync)
