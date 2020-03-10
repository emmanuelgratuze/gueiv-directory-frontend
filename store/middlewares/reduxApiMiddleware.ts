/*
  Only exports redux api middleware
  => Ensure that isomorphic fetch loaded before
*/

/* eslint-disable */
import 'es6-promise/auto';
import 'isomorphic-fetch';

export {
  RSAA,
  isRSAA,
  validateRSAA,
  isValidRSAA,
  InvalidRSAA,
  InternalError,
  RequestError,
  ApiError,
  getJSON,
  createMiddleware,
  apiMiddleware
} from 'redux-api-middleware';
