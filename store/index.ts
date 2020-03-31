import {
  applyMiddleware,
  createStore,
  Store,
  StoreEnhancer
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import localStoragePersister, { getStateFromLocalStorage } from '~/utils/redux/storeLocalStoragePersister'

// Middlewares
import { apiMiddleware } from './middlewares/reduxApiMiddleware'
import addEntitiesMiddleware from './middlewares/addEntitiesMiddleware'
import apiRequestsMiddleware from './middlewares/apiRequests'

import rootReducer from './app/reducer'
import initialStateDefault from './initialState'
import { rootSaga } from './app/saga'
import { WithSagaTaskStore } from './types'

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
  const sagaMiddleware = createSagaMiddleware()

  const preloadedStates = initialState.merge(localStorageState)

  const store: WithSagaTaskStore = createStore(
    rootReducer,

    preloadedStates,

    bindMiddleware([
      // Add headers (auth) and prepend API endpoint to every api calls
      apiRequestsMiddleware,

      // Api middle (make calls on store actions)
      apiMiddleware,

      // Clean API response (prop keys to camelcase)
      addEntitiesMiddleware,

      // Saga
      sagaMiddleware
    ])
  )

  localStoragePersister(['interface'])(store)

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
