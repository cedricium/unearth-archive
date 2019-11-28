import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  // SAVE_EMAIL,
  UPDATE_EMAIL,
  // SAVE_FREQUENCY_PREF,
  UPDATE_FREQUENCY_PREF,
  UPDATE_ONBOARDING_STATUS,
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
  error: null,
  onboarding: {
    completed: false,
    data: {
      emailAddress: '',
      newsletterFrequency: 'daily',
    },
  },
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_INFO_START:
      return {
        ...state,
      }
    case FETCH_USER_INFO_SUCCESS:
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
    case FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        error: 'LOGIN_FAILURE',
      }
    case LOGIN_START:
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return state
    case UPDATE_EMAIL:
      return {
        ...state,
        onboarding: {
          ...state.onboarding.completed,
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
          ...state.onboarding.completed,
          data: {
            ...state.onboarding.data,
            newsletterFrequency: payload,
          },
        },
      }
    case UPDATE_ONBOARDING_STATUS:
      return {
        ...state,
        onboarding: {
          completed: true,
          data: {
            ...state.onboarding.data,
          },
        },
      }
    default:
      return state
  }
}

export default rootReducer
