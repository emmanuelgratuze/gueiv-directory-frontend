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
  const apiConfig = selectAppConfig(state).get('api')
  const { [RSAA]: request } = action

  const headers: Headers = request.headers
    ? request.headers
    : apiConfig.get('headers').toJS()

  if (apiConfig.get('language')) {
    headers['Accept-Language'] = apiConfig.get('language')
  }

  request.headers = headers

  // Prepend endpoint with host
  if (process.browser) {
    const { hostname, protocol, port } = window.location
    request.endpoint = `${protocol}//${hostname}${port ? `:${port}` : ''}/api/${request.endpoint}`
  } else {
    request.endpoint = `${apiConfig.get('host')}/${request.endpoint}`
  }

  const newAction = {
    ...action,
    RSAA: request
  }

  return next(newAction)
}

export default apiRequestsMiddleware
