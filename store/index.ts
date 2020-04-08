import {
  applyMiddleware,
  createStore,
  Store,
  StoreEnhancer
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fromJS } from 'immutable'

import localStorageListener, { getStateFromLocalStorage } from 'utils/redux/storeLocalStoragePersister'

// Middlewares
import dataMiddleware from './middlewares/dataMiddleware'

import rootReducer from './app/reducer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bindMiddleware = (middlewares: any[]): StoreEnhancer<{ dispatch: unknown }, {}> => {
  if (process.env.NODE_ENV !== 'production') {
    const devMiddlewares = [
      ...middlewares
    ]
    return composeWithDevTools(applyMiddleware(...devMiddlewares))
  }
  return applyMiddleware(...middlewares)
}

const localStorageState = getStateFromLocalStorage()

function configureStore(initialState = fromJS({})): Store {
  const preloadedStates = initialState.merge(localStorageState)

  const store = createStore(
    rootReducer,

    preloadedStates,

    bindMiddleware([
      // Add entities (prop keys to camelcase)
      dataMiddleware
    ])
  )

  localStorageListener([['interface', 'brandsColors']])(store)

  return store
}

export default configureStore
