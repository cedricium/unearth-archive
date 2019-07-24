import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SYNC_THINGS_START,
  SYNC_THINGS_SUCCESS,
  SYNC_THINGS_FAILURE,
  DELETE_THING_START,
  DELETE_THING_SUCCESS,
  DELETE_THING_FAILURE,
} from '../actions'

const initialState = {
  auth: {
    accessToken: '',
    refreshToken: '',
    isLoggedIn: false,
  },
  user: {
    id: '',
    username: '',
    profileImg: '',
  },
  things: {
    subreddits: null,
    posts: null,
    comments: null,
  },
  error: null,
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case LOGIN_START:
      return {
        ...state,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          ...payload.auth,
          isLoggedIn: true,
        },
        user: {
          ...state.user,
          ...payload.user,
        }
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        error: 'LOGIN_FAILURE',
      }
    case SYNC_THINGS_START:
      return {
        ...state,
      }
    case SYNC_THINGS_SUCCESS:
      return {
        ...state,
        things: {
          subreddits: { ...state.subreddits, ...payload.subreddits },
          posts: { ...state.posts, ...payload.posts },
          comments: { ...state.comments, ...payload.comments },
        }
      }
    default:
      return state
  }
}

export default rootReducer
