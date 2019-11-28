import axios from 'axios'

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const FETCH_USER_INFO_START = 'FETCH_USER_INFO_START'
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS'
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE'
export const SAVE_EMAIL = 'SAVE_EMAIL'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const SAVE_FREQUENCY_PREF = 'SAVE_FREQUENCY_PREF'
export const UPDATE_FREQUENCY_PREF = 'UPDATE_FREQUENCY_PREF'
export const UPDATE_ONBOARDING_STATUS = 'UPDATE_ONBOARDING_STATUS'

export const retrieveRedditorInfo = ({
  accessToken,
  refreshToken,
}) => async dispatch => {
  dispatch({ type: FETCH_USER_INFO_START })
  try {
    const { data } = await axios.get(`https://oauth.reddit.com/api/v1/me`, {
      headers: { Authorization: `bearer ${accessToken}` },
    })
    const { id, icon_img, name } = data
    dispatch({
      type: FETCH_USER_INFO_SUCCESS,
      payload: {
        auth: {
          accessToken,
          refreshToken,
        },
        user: {
          id,
          profileImg: icon_img,
          username: name,
        },
      },
    })
  } catch (error) {
    console.error(error)
    dispatch({ type: FETCH_USER_INFO_FAILURE })
  }
}

export const registerUser = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_START })
  try {
    const { id, username } = getState().user
    await axios.post(`${BACKEND_API_URL}/users`, { id, username })
    dispatch({ type: LOGIN_SUCCESS })
  } catch (error) {
    console.error(error)
    dispatch({ type: LOGIN_FAILURE })
  }
}

export const updateOnboardingStatus = () => dispatch => {
  dispatch({ type: UPDATE_ONBOARDING_STATUS })
}
