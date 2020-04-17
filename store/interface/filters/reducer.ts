import { fromJS, List } from 'immutable'
import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'

import { BasicAction } from 'store/types'
import {
  OPEN_FILTER_BOX,
  CLOSE_FILTER_BOX,
  APPLY_FILTER,
  APPLY_FILTERS,
  REMOVE_FILTER
} from './actionsTypes'
import {
  ApplyFilterAction,
  ApplyFiltersActions,
  Filter,
  RemoveFilterAction
} from './types'
import { availableFilters } from './initialState'

function menuState(state = fromJS({ isOpen: false }), action: BasicAction): Reducer {
  switch (action.type) {
    case OPEN_FILTER_BOX:
      return fromJS({
        isOpen: true,
        filterId: action.payload
      })
    case CLOSE_FILTER_BOX:
      return fromJS({
        isOpen: false
      })
    default:
      return state
  }
}

function currentFiltersValues(state = fromJS({}), action: ApplyFilterAction | ApplyFiltersActions | RemoveFilterAction): Reducer {
  switch (action.type) {
    case APPLY_FILTER: {
      const { filterId, filterValue } = action.payload
      if (filterValue.size === 0) {
        return state.delete(filterId)
      }

      return state.set(
        filterId,
        !List.isList(filterValue) && !Array.isArray(filterValue)
          ? List([filterValue])
          : filterValue
      )
    }
    case APPLY_FILTERS: {
      const { filters } = action.payload

      // Ensure filters are array
      Object.keys(filters).forEach((key) => {
        if (!List.isList(filters[key]) && !Array.isArray(filters[key])) {
          filters[key] = List([filters[key]])
        }
      })

      return fromJS(filters)
    }
    case REMOVE_FILTER: {
      const { filterId } = action.payload

      return state.delete(filterId)
    }
    default:
      return state
  }
}

function availableFiltersReducer(state = fromJS(availableFilters)): List<Filter> {
  return state
}


/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  menuState,
  currentFiltersValues,
  availableFilters: availableFiltersReducer
})
