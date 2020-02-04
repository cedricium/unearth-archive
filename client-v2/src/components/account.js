import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import { navigate } from 'gatsby'
import axios from 'axios'

import SEO from './seo'

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
// Source: https://jaredpalmer.com/formik/docs/tutorial#validation
const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const Account = ({ username, id }) => {
  const [email, setEmail] = useState('')
  const [frequency, setFrequency] = useState('')

  const formik = useFormik({
    enableReinitialize: true,
    initialStatus: '',
    initialValues: {
      email,
      frequency,
    },
    validate,
    onSubmit: async (values, actions) => {
      const { status } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_API_URL}/users/${id}`,
        values,
      )
      if (status !== 204) {
        actions.setStatus('API Error: failed to update your account settings.')
      } else {
        actions.setStatus('Success!')
      }
    },
  })

  useEffect(() => {
    const getData = async () => {
      const { email, frequency } = await fetchUserAccount()
      setEmail(email)
      setFrequency(frequency)
    }
    getData()
  }, [])

  const fetchUserAccount = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/users/${id}`,
    )
    return data
  }

  const deleteUserAccount = async () => {
    const { status } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API_URL}/users/${id}`,
    )
    if (status === 204) {
      localStorage.clear()
      navigate('/')
    } else {
      alert('Oops!')
    }
  }

  return (
    <>
      <SEO title='Account' />
      <section>
        <h2>Welcome, {username}</h2>
        <p>
          This is your account dashboard. Here you can manage your account
          preferences or even delete your account should you choose.
        </p>
        <blockquote>
          Remember, Unearth is still in development and you are using the
          pre-launched version. Check back often to see if any updates have been
          made.
        </blockquote>
        <form>
          <fieldset>
            <legend>Preferences</legend>
            <div>
              <label
                htmlFor='email'
                title='Email address where you would like to receive your personalized newsletters.'
              >
                <u>Email</u>
              </label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='snoo@reddit.com'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </div>

            <br />

            <div>
              <label
                htmlFor='frequency'
                title='How frequently you would like to receive your personalized newsletters.'
              >
                <u>Frequency</u>
              </label>
              <div>
                <input
                  type='radio'
                  name='frequency'
                  id='daily'
                  value='daily'
                  checked={formik.values.frequency === 'daily'}
                  onChange={formik.handleChange}
                />
                <label htmlFor='daily'>Daily</label>
              </div>
              <div>
                <input
                  type='radio'
                  name='frequency'
                  id='weekly'
                  value='weekly'
                  checked={formik.values.frequency === 'weekly'}
                  onChange={formik.handleChange}
                />
                <label htmlFor='weekly'>Weekly</label>
              </div>
              <div>
                <input
                  type='radio'
                  name='frequency'
                  id='monthly'
                  value='monthly'
                  checked={formik.values.frequency === 'monthly'}
                  onChange={formik.handleChange}
                />
                <label htmlFor='monthly'>Monthly</label>
              </div>

              <hr className='hr-text' data-content='OR' />

              <div>
                <input
                  type='radio'
                  name='frequency'
                  id='unsubscribe'
                  value='unsubscribe'
                  checked={formik.values.frequency === 'unsubscribe'}
                  onChange={formik.handleChange}
                />
                <label htmlFor='unsubscribe'>Unsubscribe</label>
              </div>
            </div>

            <br />

            <div>
              <input
                type='button'
                value='Save Changes'
                onClick={formik.handleSubmit}
              />
            </div>
            {formik.status && <div>{formik.status}</div>}
          </fieldset>
        </form>

        <form action=''>
          <fieldset>
            <legend>Irreversibles</legend>
            <input
              type='button'
              className='danger'
              value='Delete Account'
              title='This action is permanent and irreversible. Use with caution.'
              onClick={deleteUserAccount}
            />

            <input
              type='button'
              value='✨ Show Your Support'
              title='Unearth is free to use, indefinitely. Any support is appreciated but not necessary. Coming soon.'
              onClick={() => {}}
              disabled
            />
          </fieldset>
        </form>
      </section>
    </>
  )
}

const mapStateToProps = state => ({
  username: state.user.username,
  id: state.user.id,
  email: state.onboarding.data.emailAddress,
  frequency: state.onboarding.data.newsletterFrequency,
})

export default connect(mapStateToProps)(Account)
