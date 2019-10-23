import React from 'react'
import Navigation from './utils/Navigation'

const Sync = () => {
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
      <button>Sync Reddit Saves</button>
      <Navigation />
    </div>
  )
}

export default Sync
