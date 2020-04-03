/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { fromJS } from 'immutable'
import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'

import { BasicAction } from '~/store/types'
import { SET_BRANDS_COLORS } from './actionsTypes'


function brandsColors(state = fromJS(null), action: BasicAction): Reducer {
  switch (action.type) {
    case SET_BRANDS_COLORS:
      return fromJS(action.payload)
    default:
      return state
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  brandsColors
})
