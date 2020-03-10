/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import brands from '@store/entities/brands/reducer';

export const initialState = fromJS({
  // Initial state
});

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  brands
});
