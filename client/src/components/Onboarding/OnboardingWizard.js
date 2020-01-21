import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Email, Frequency, Sync, Success } from '../Onboarding'
import styled from 'styled-components'

const Welcome = props => {
  return (
    <div>
      <h1>Welcome to Unearth</h1>
      <h2>Background</h2>
      <p>
        Unearth is a simple tool to help you rediscover all those things you've
        saved on Reddit. And by tool we actually mean a personalized email
        newsletter!
      </p>
      <p>
        The current tools provided by Reddit are insufficient at helping
        Redditors manage and rediscover their saved things.
      </p>
      <p>
        <strong>
          Unearth aims to be the best service to help Redditors rediscover the
          things they have saved through the use of active reminders.
        </strong>{' '}
        By leveraging content resurfacing to create personalized emails with
        users' saved things, we will be able to help more Redditors take control
        of their saved content and evoke a sense of nostalgia as they are
        reminded of the posts and comments they have saved during their time on
        Reddit.
      </p>
      <h2>How it Works</h2>
      <p>
        Unearth is really pretty simple. You provide your email address and let
        us know how often you would like to receive emails. Then after syncing
        your Reddit saves with our service, you can sit back and relax.
      </p>
      <p>
        Soon thereafter you will begin receiving your personalized newsletter
        that contains five (5) of your Reddit saves. Grab a cup of coffee or tea
        and prepare to take a trip down memory lane.
      </p>
      <button onClick={() => props.history.push('/onboarding/email')}>
        Let's Begin!
      </button>
    </div>
  )
}

const Container = styled.section`
  margin: 1rem auto;
  width: 100%;
  max-width: 760px;
  padding: 0 1rem;
  box-sizing: border-box;
`

const OnboardingContainer = props => (
  <Container className='onboarding container'>{props.children}</Container>
)

const Onboarding = () => {
  return (
    <OnboardingContainer>
      <Switch>
        <Route path='/onboarding' exact component={Welcome} />
        <Route path='/onboarding/email' component={Email} />
        <Route path='/onboarding/frequency' component={Frequency} />
        <Route path='/onboarding/sync' component={Sync} />
        <Route path='/onboarding/success' component={Success} />
      </Switch>
    </OnboardingContainer>
  )
}

export default Onboarding
