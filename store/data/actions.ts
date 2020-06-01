import {
  AddDataAction,
  ClearDataAction,
  ADD_DATA,
  CLEAR_DATA,
  Data,
  SchemaKeys
} from './types.d'

export function addData(schema: SchemaKeys | SchemaKeys[], data: Data[]): AddDataAction {
  return {
    type: ADD_DATA,
    payload: {
      schema,
      data
    }
  }
}

export const clearData = (entitiesNames?: string[]): ClearDataAction => ({
  type: CLEAR_DATA,
  payload: {
    entitiesNames
  }
})
