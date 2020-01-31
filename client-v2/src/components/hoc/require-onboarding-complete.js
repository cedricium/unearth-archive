import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'

const requireOnboardingComplete = ComposedComponent => {
  const Onboarded = props => {
    useEffect(() => {
      if (props.hasCompletedOnboarding === false) {
        return navigate('/app/onboarding')
      }
    }, [props.hasCompletedOnboarding])

    return <ComposedComponent {...props} />
  }

  const mapStateToProps = state => ({
    hasCompletedOnboarding: state.onboarding.completed,
  })

  return connect(mapStateToProps)(Onboarded)
}

export default requireOnboardingComplete
