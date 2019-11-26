import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
  error: null,
  onboarding: {
    data: {
      emailAddress: '',
      newsletterFrequency: 'daily',
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
