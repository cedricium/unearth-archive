import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SYNC_THINGS_START,
  SYNC_THINGS_SUCCESS,
  // SYNC_THINGS_FAILURE,
  // SAVE_EMAIL,
  UPDATE_EMAIL,
  // SAVE_FREQUENCY_PREF,
  UPDATE_FREQUENCY_PREF,
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
  onboarding: {
    steps: {
      email: {
        completed: false,
      },
      frequency: {
        completed: false,
      },
      sync: {
        completed: false,
      },
    },
    data: {
      emailAddress: '',
      newsletterFrequency: 'daily',
      // things: --> state.things
    },
  },
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
        },
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
        },
      }
    case UPDATE_EMAIL:
      return {
        ...state,
        onboarding: {
          ...state.onboarding.steps,
          data: {
            ...state.onboarding.data,
            emailAddress: payload,
          },
        },
      }
    case UPDATE_FREQUENCY_PREF:
      return {
        ...state,
        onboarding: {
          ...state.onboarding.steps,
          data: {
            ...state.onboarding.data,
            newsletterFrequency: payload,
          },
        },
      }
    default:
      return state
  }
}

export default rootReducer
