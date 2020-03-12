import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fromJS } from 'immutable'

// Middlewares
import { apiMiddleware } from './middlewares/reduxApiMiddleware'
import apiResponsesMiddleware from './middlewares/apiResponses'
import apiRequestsMiddleware from './middlewares/apiRequests'
// import progressMiddleware from './middlewares/progressMiddleware'

import rootReducer from './entities/app/reducer'
import initialState from './initialState'
import appSaga from './entities/app/saga';
import { WithSagaTaskStore } from './types'

const bindMiddleware = (middlewares: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const devMiddlewares = [
      ...middlewares
    ];
    return composeWithDevTools(applyMiddleware(...devMiddlewares));
  }
  return applyMiddleware(...middlewares);
};

function configureStore(
  preloadedState = initialState,
  { isServer, req = null }: { isServer: boolean, req: Request | null }
) {
  const sagaMiddleware = createSagaMiddleware();

  const store: WithSagaTaskStore = createStore(
    rootReducer,
    // fromJS(stateFromCookies),
    initialState,
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
  );

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(appSaga);
  }

  return store;
}

export default configureStore;
