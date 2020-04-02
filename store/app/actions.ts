import {
  AddEntitiesAction,
  ClearEntitiesAction,
  ADD_ENTITIES,
  CLEAR_ENTITIES,
  AppEntities
} from './types'


export const addEntities = (entities: AppEntities): AddEntitiesAction => ({
  type: ADD_ENTITIES,
  payload: {
    entities
  }
})

export const clearEntities = (entitiesNames: keyof AppEntities): ClearEntitiesAction => ({
  type: CLEAR_ENTITIES,
  payload: {
    entitiesNames
  }
})
