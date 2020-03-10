/*
  Immutable adaptation of https://github.com/veigastom/redux-cookies-middleware
*/

import { fromJS } from 'immutable';
import jsCookie from 'js-cookie';

const setCookie = (name, value, expiry = 365, secure = false) => {
  jsCookie.set(name, value, { expires: expiry, path: '/', secure });
};

export const getStateFromCookies = (initialState = fromJS({}), paths, getCookie) => {
  const newState = Object.keys(paths).reduce((state, path) => {
    const pathConfig = paths[path];
    let valueFromCookie = getCookie(pathConfig.name);

    // Convert null, true, false, undefined values
    valueFromCookie = valueFromCookie === 'false' ? false : valueFromCookie;
    valueFromCookie = valueFromCookie === 'true' ? true : valueFromCookie;
    valueFromCookie = valueFromCookie === 'null' ? null : valueFromCookie;
    valueFromCookie = valueFromCookie === 'undefined' ? undefined : valueFromCookie;

    if (valueFromCookie === null || typeof valueFromCookie === 'undefined') {
      return state;
    }

    if (pathConfig.type === 'number') {
      const newValue = parseFloat(valueFromCookie);
      if (!Number.isNaN(newValue)) {
        valueFromCookie = newValue;
      } else {
        valueFromCookie = typeof pathConfig.fallbackValue !== 'undefined'
          ? pathConfig.fallbackValue
          : valueFromCookie;
      }
    }

    return state.setIn(path.split('.'), fromJS(valueFromCookie));
  }, initialState);

  return newState;
};

/**
 * Middleware to persist state in cookies.
 * @param {Object} paths
 * @param {Object} customOptions
 */
const reduxCookiesMiddleware = (paths = {}, customOptions = {}) => {
  const options = {
    // eslint-disable-next-line no-console
    logger: console.error,
    setCookie,
    defaultEqualityCheck: (a, b) => (a === b),
    defaultDeleteCheck: value => (typeof value === 'undefined'),
    ...customOptions
  };

  return store => next => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    Object.keys(paths).forEach((pathToState) => {
      const pathList = pathToState.split('.');
      const prevVal = prevState.getIn(pathList);
      const nextVal = nextState.getIn(pathList);

      const state = paths[pathToState];
      const equalityCheck = state.equalityCheck || options.defaultEqualityCheck;
      const deleteCheck = state.deleteCheck || options.defaultDeleteCheck;

      if (!equalityCheck(prevVal, nextVal)) {
        if (nextVal === null) {
          return jsCookie.remove(state.name);
        }

        const nextValueParsed = typeof nextVal === 'string'
          ? nextVal
          : JSON.stringify(nextVal);

        if (deleteCheck(nextVal)) {
          options.setCookie(state.name, nextValueParsed, 0);
        } else {
          options.setCookie(state.name, nextValueParsed);
        }
      }
      return true;
    });

    return result;
  };
};

export default reduxCookiesMiddleware;
