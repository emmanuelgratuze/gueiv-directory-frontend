import {
  applyMiddleware,
  createStore,
  Store,
  StoreEnhancer
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import localStoragePersister, { getStateFromLocalStorage } from '~/utils/redux/storeLocalStoragePersister'

// Middlewares
import addEntitiesMiddleware from './middlewares/addEntitiesMiddleware'

import rootReducer from './app/reducer'
import initialStateDefault from './initialState'

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

function configureStore(initialState = initialStateDefault): Store {
  const preloadedStates = initialState.merge(localStorageState)

  const store = createStore(
    rootReducer,

    preloadedStates,

    bindMiddleware([
      // Add entities (prop keys to camelcase)
      addEntitiesMiddleware
    ])
  )

  localStoragePersister(['interface'])(store)

  return store
}

export default configureStore
