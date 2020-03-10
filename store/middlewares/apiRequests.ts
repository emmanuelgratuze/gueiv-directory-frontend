import { RSAA } from './reduxApiMiddleware';
import { Store, Dispatch } from 'redux';
import { BasicAction } from '@store/types';
import { RSAAAction } from 'redux-api-middleware';
import { AppConfig } from 'config/types';
import { Headers } from 'request';

const apiRequestsMiddleware = (store: Store) => (next: Dispatch) => (action: RSAAAction) => {
  if (!action[RSAA]) {
    return next(action);
  }

  const apiConfig = process.env.app.api;
  const { [RSAA]: request } = action;

  const headers: Headers = request.headers
    ? request.headers
    : apiConfig.headers;
  const state = store.getState();

  // Add auth token
  const token = state.getIn(['auth', 'token']);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (apiConfig.language) {
    headers['Accept-Language'] = apiConfig.language;
  }

  request.headers = headers;

  // Prepend endpoint with host
  if (process.browser) {
    const { hostname, protocol, port } = window.location;
    request.endpoint = `${protocol}//${hostname}${port ? `:${port}` : ''}/api/${request.endpoint}`;
  } else {
    request.endpoint = `${apiConfig.host}/${request.endpoint}`;
  }

  // newAction[RSAA] = request;
  const newRequest = {
    ...action,
    RSAA: request
  };
  return next(newRequest);
};

export default apiRequestsMiddleware;
