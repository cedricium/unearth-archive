import { connect } from 'react-redux'
import { navigate } from 'gatsby'

const AppDefault = props => {
  /**
   * Default: path = '/app'
   * Entry point for the web app portion of tryunearth.com
   * Solely responsible for navigating either to the login page or the account
   * page depending on whether the user is logged in or not.
   */
  if (props.isLoggedIn === true) {
    navigate('/app/account')
    return null
  } else {
    navigate('/app/login')
    return null
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  hasCompletedOnboarding: state.onboarding.completed,
})

export default connect(mapStateToProps)(AppDefault)
