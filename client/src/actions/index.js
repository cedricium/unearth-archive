import axios from 'axios'

import { extractSubreddits, extractPosts, extractComments } from '../utils'
import { getSavedThings } from '../utils/api'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SYNC_THINGS_START = 'SYNC_THINGS_START'
export const SYNC_THINGS_SUCCESS = 'SYNC_THINGS_SUCCESS'
export const SYNC_THINGS_FAILURE = 'SYNC_THINGS_FAILURE'
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

export const getThings = () => async (dispatch, getState) => {
  dispatch({ type: SYNC_THINGS_START })
  try {
    const { auth, user } = getState()
    const { accessToken } = auth
    const { username } = user
    const things = await getSavedThings({ username, accessToken })
    const subredditsById = extractSubreddits(things)
    const postsBySubredditId = extractPosts(things)
    const commentsBySubredditId = extractComments(things)
    dispatch({
      type: SYNC_THINGS_SUCCESS,
      payload: {
        subreddits: subredditsById,
        posts: postsBySubredditId,
        comments: commentsBySubredditId,
      },
    })
  } catch (error) {
    console.error(error)
    dispatch({ type: SYNC_THINGS_FAILURE })
  }
}
