/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable'

import brands from '~/store/entities/brands/reducer'
import criteria from '~/store/entities/criteria/reducer'
import interfaceReducer from '~/store/interface/reducer'

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  entities: combineReducers({
    brands,
    criteria
  }),
  interface: interfaceReducer
})
