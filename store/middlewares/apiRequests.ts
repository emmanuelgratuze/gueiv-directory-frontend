import { Headers } from 'request'
import { Store, Dispatch } from 'redux'
import { RSAAAction } from 'redux-api-middleware'

import { RSAA } from './reduxApiMiddleware'
import { selectAppConfig } from '../app/selectors'

const apiRequestsMiddleware = (store: Store) => (next: Dispatch) => (action: RSAAAction) => {
  if (!action[RSAA]) {
    return next(action)
  }

  const state = store.getState()
  const apiConfig = selectAppConfig(state)
  const { [RSAA]: request } = action

  const headers: Headers = request.headers
    ? request.headers
    : apiConfig.headers

  if (apiConfig.language) {
    headers['Accept-Language'] = apiConfig.language
  }

  request.headers = headers

  // Prepend endpoint with host
  if (process.browser) {
    const { hostname, protocol, port } = window.location
    request.endpoint = `${protocol}//${hostname}${port ? `:${port}` : ''}/api/${request.endpoint}`
  } else {
    request.endpoint = `${apiConfig.host}/${request.endpoint}`
  }

  // newAction[RSAA] = request;
  const newAction = {
    ...action,
    RSAA: request
  }

  return next(newAction)
}

export default apiRequestsMiddleware
