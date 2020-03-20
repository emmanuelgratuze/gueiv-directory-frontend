import {
  AddEntitiesAction,
  ClearEntitiesAction,
  AppConfig,
  SetConfigAction,
  SET_CONFIG,
  ADD_ENTITIES,
  CLEAR_ENTITIES,
  AppEntities
} from './types.d'

export const setConfig = (appConfig: AppConfig): SetConfigAction => ({
  type: SET_CONFIG,
  payload: appConfig
})

export const addEntities = (payload: { entities: AppEntities }): AddEntitiesAction => ({
  type: ADD_ENTITIES,
  payload
})

export const clearEntities = (entitiesNames: keyof AppEntities): ClearEntitiesAction => ({
  type: CLEAR_ENTITIES,
  payload: {
    entitiesNames
  }
})
