import { fromJS } from 'immutable'
import { normalize } from 'normalizr'
import { keys } from 'utils/object'
import mergeEntities from 'utils/redux/mergeEntities'
import {
  AddDataAction,
  ClearDataAction,
  ADD_DATA,
  CLEAR_DATA,
  ImmutableDataTree
} from './types.d'
import * as schemas from './schemas'

const dataReducer = (
  state: ImmutableDataTree = fromJS({}),
  action: (AddDataAction | ClearDataAction)
): ImmutableDataTree => {
  switch (action.type) {
    case ADD_DATA: {
      let newState = state
      const { schema: type, data } = action.payload

      const dataSchema = Array.isArray(type)
        ? type.map((singleType) => schemas[singleType])
        : schemas[type]

      if (!dataSchema || (Array.isArray(dataSchema) && (dataSchema).filter((schema) => !schema).length > 0)) {
        throw Error(`The data type "${type}" doesn't exists in the app data schemas. Available data types: ${keys(schemas).join(', ')}`)
      }

      const normalizedData = normalize(data, dataSchema)
      keys(normalizedData.entities).forEach((entityKey) => {
        newState = newState.set(
          entityKey,
          mergeEntities(normalizedData.entities[entityKey], newState.get(entityKey))
        )
      })

      return newState
    }
    case CLEAR_DATA: {
      let newState = state
      action.payload.entitiesNames.forEach((entityName) => {
        newState = newState.remove(entityName)
      })
      return newState
    }
    default:
      return state
  }
}

export default dataReducer
