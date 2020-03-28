/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { fromJS } from 'immutable'
import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'

import brands from '~/store/entities/brands/reducer'
import criteria from '~/store/entities/criteria/reducer'

import { BasicAction } from '~/store/types'
import { SET_CONFIG } from './types'


function appReducer(state = fromJS({}), action: BasicAction): Reducer {
  switch (action.type) {
    case SET_CONFIG:
      return fromJS(action.payload)
    default:
      return state
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  app: appReducer,
  entities: combineReducers({
    brands,
    criteria
  })
})
