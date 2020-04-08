/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { fromJS } from 'immutable'
import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'

import { BasicAction } from 'store/types'
import { SET_BRANDS_COLORS, TRIGGER_DATA_READY } from './actionsTypes'


function brandsColors(state = fromJS({}), action: BasicAction): Reducer {
  switch (action.type) {
    case SET_BRANDS_COLORS:
      return fromJS(action.payload)
    default:
      return state
  }
}

function isDataReady(state = false, action: BasicAction): boolean {
  switch (action.type) {
    case TRIGGER_DATA_READY:
      return true
    default:
      return state
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  brandsColors,
  isDataReady
})
