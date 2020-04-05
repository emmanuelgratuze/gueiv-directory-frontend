import {
  AddDataAction,
  ClearDataAction,
  ADD_DATA,
  CLEAR_DATA,
  Data,
  SchemaKeys
} from './types.d'

export function addData(type: SchemaKeys | SchemaKeys[], data: Data[]): AddDataAction {
  return {
    type: ADD_DATA,
    payload: {
      type,
      data
    }
  }
}

export const clearEntities = (entitiesNames: string[]): ClearDataAction => ({
  type: CLEAR_DATA,
  payload: {
    entitiesNames
  }
})
