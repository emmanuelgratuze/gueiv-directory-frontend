import {
  AddEntitiesAction,
  ClearEntitiesAction,
  ADD_ENTITIES,
  CLEAR_ENTITIES,
  Entities,
  EntitiesNames
} from './types.d'


export const addEntities = (entities: unknown): AddEntitiesAction => ({
  type: ADD_ENTITIES,
  payload: {
    entities
  }
})

export const clearEntities = (entitiesNames: string[]): ClearEntitiesAction => ({
  type: CLEAR_ENTITIES,
  payload: {
    entitiesNames
  }
})
