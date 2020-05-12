/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { fromJS } from 'immutable'
import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'

import { BasicAction } from 'store/types'
import { SET_BRANDS_COLORS, SET_MENU_OPEN_STATE } from './actionsTypes'

import filtersReducer from './filters/reducer'

function brandsColors(state = fromJS({}), action: BasicAction): Reducer {
  switch (action.type) {
    case SET_BRANDS_COLORS:
      return fromJS(action.payload)
    default:
      return state
  }
}

function isMenuOpen(state = true, action: BasicAction): boolean {
  switch (action.type) {
    case SET_MENU_OPEN_STATE:
      return fromJS(action.payload)
    default:
      return state
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  brandsColors,
  isMenuOpen,
  filters: filtersReducer
})
