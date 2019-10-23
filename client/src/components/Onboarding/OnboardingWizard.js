import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Email, Frequency, Sync, Success } from '../Onboarding'

const Welcome = props => {
  return (
    <div>
      <h1>👋 Hello!</h1>
      <h2>Welcome to Unearth</h2>
      <p>
        Unearth is a simple tool to help you rediscover all those things you've
        saved on Reddit. And by tool we actually mean a personalized email
        newsletter!
      </p>
      <p>You might be wondering, "how does it work?" Allow me to explain:</p>
      <ul>
        <li>
          first, we gather your email and preference of frequency for receiving
          the newsletter (choose between daily, weekly, or monthly)
        </li>
        <li>then, we'll ask you to sync your Reddit saves with our service</li>
        <li>
          finally, per your preferred frequency, we'll send you an email
          containing links to Reddit posts and comments you've saved
        </li>
      </ul>
      <button onClick={() => props.history.push('/onboarding/email')}>
        Let's Begin!
      </button>
    </div>
  )
}

const Onboarding = () => {
  return (
    <Switch>
      <Route path='/onboarding' exact component={Welcome} />
      <Route path='/onboarding/email' component={Email} />
      <Route path='/onboarding/frequency' component={Frequency} />
      <Route path='/onboarding/sync' component={Sync} />
      <Route path='/onboarding/success' component={Success} />
    </Switch>
  )
}

export default Onboarding
