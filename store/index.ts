import {
  applyMiddleware,
  createStore,
  Store,
  StoreEnhancer
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

// Middlewares
import { apiMiddleware } from './middlewares/reduxApiMiddleware'
import apiResponsesMiddleware from './middlewares/apiResponses'
import apiRequestsMiddleware from './middlewares/apiRequests'

import rootReducer from './app/reducer'
import initialState from './initialState'
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

function configureStore(preloadedState = initialState): Store {
  const sagaMiddleware = createSagaMiddleware()

  const store: WithSagaTaskStore = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([
      // progressMiddleware,

      // Add headers (auth) and prepend API endpoint to every api calls
      apiRequestsMiddleware,

      // Api middle (make calls on store actions)
      apiMiddleware,

      // Clean API response (prop keys to camelcase)
      apiResponsesMiddleware,

      sagaMiddleware
    ])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore()
