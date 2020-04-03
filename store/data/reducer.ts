/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { Reducer } from 'redux'
import { fromJS } from 'immutable'

import {
  AddEntitiesAction,
  ClearEntitiesAction,
  ADD_ENTITIES,
  CLEAR_ENTITIES,
  EntitiesNames
} from './types.d'
import { ImmutableAppState } from '../app/types'

import { cms } from 'cms/config'

import mergeEntities from '~/utils/redux/mergeEntities'

const entitiesReducer = (
  state: ImmutableAppState,
  action: (AddEntitiesAction | ClearEntitiesAction)
): Map<string, unknown> => {
  switch (action.type) {
    case ADD_ENTITIES: {
      let newState = state
      action.payload.entities.forEach((entities) => {
        Object.keys(entities).map((entityKey: string) => {
          if (entityKey in cms.collectionNames) {
            newState.setIn(
              ['entities', entityKey],
              mergeEntities(entities, newState.get('entities'))
            )
          }
        })
      }, state)

      if (!entities) {
        return state
      }

      return newState
    }
    case CLEAR_ENTITIES: {
      if (!action.payload) {
        return state
      }

      return action.payload.entitiesNames.reduce((reducedState, entityName) => (

      ), state)
    }
    default:
      return state
  }
}

export default entitiesReducer

export default reducer
