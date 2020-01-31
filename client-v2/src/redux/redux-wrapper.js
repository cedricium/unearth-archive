import React from 'react'
import { Provider } from 'react-redux'
import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

// constants, actions, and action creators
import axios from 'axios'

const BACKEND_API_URL =
  process.env.REACT_APP_BACKEND_API_URL || `http://localhost:5000/api/v1`

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

// root reducer
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
// export default rootReducer

// condfigureStore

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
// const createStore = () =>
//   reduxCreateStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
const store = reduxCreateStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)),
)

const persistor = persistStore(store)

export default ({ element }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{element}</PersistGate>
  </Provider>
)
