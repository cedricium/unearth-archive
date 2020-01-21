import React from 'react'
import { connect } from 'react-redux'

const Success = ({ frequency }) => {
  const calculateNextEmailDelivery = () => {
    switch (frequency) {
      case 'daily':
        return 'tomorrow'
      case 'weekly':
        return 'next Monday'
      case 'monthly':
        return 'on the 15th of next month'
    }
  }

  return (
    <div>
      <h1>Success!</h1>
      <p>
        You are all set. Check your inbox for your first personalized
        newsletter.
      </p>
      <p>
        You can expect your first scheduled newsletter{' '}
        <u>{calculateNextEmailDelivery()}.</u>
      </p>
      <p>
        {/* === TODO === */}
        {/*
         *   turn this into a link, directing back to a simple dashboard
         *   or settings page where email and frequency preferences can be
         *   updated.
         *
         */}
        {/* &lt; Back Home */}
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  frequency: state.onboarding.data.newsletterFrequency,
})

export default connect(mapStateToProps)(Success)
