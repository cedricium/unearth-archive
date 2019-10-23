import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import thunk from 'redux-thunk'

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * The line below lets us inspect the Redux store using the
 * `redux-devtools-extension` extension.
 * For more info, see: https://github.com/zalmoxisus/redux-devtools-extension#usage
 */
export default () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
