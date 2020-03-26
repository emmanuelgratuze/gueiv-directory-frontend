import { fromJS, Map } from 'immutable'
import {
  ADD_ENTITIES,
  CLEAR_ENTITIES,
  AddEntitiesAction,
  ClearEntitiesAction
} from '~/store/app/types'
import mergeEntities from '~/utils/redux/mergeEntities'

function brandsReducer(state = fromJS({}), action: (AddEntitiesAction | ClearEntitiesAction)): Map<string, unknown> {
  switch (action.type) {
    case ADD_ENTITIES: {
      const { criteria } = action.payload.entities

      if (!criteria) {
        return state
      }

      return fromJS(
        mergeEntities(
          criteria,
          state
        )
      )
    }
    case CLEAR_ENTITIES: {
      if (!action.payload) {
        return state
      }

      return action.payload.entitiesNames.includes('brands') ? fromJS({}) : state
    }
    default:
      return state
  }
}

export default brandsReducer
