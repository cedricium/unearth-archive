import axios from 'axios'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SAVE_EMAIL = 'SAVE_EMAIL'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const SAVE_FREQUENCY_PREF = 'SAVE_FREQUENCY_PREF'
export const UPDATE_FREQUENCY_PREF = 'UPDATE_FREQUENCY_PREF'

export const login = ({ accessToken, refreshToken }) => async dispatch => {
  dispatch({ type: LOGIN_START })
  try {
    const { data } = await axios.get(`https://oauth.reddit.com/api/v1/me`, {
      headers: { Authorization: `bearer ${accessToken}` },
    })
    const { id, icon_img, name } = data
    dispatch({
      type: LOGIN_SUCCESS,
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
    dispatch({ type: LOGIN_FAILURE })
  }
}
