import { AddEntitiesAction, ClearEntitiesAction } from "./types";
import { AppConfig } from "config/types";

export const SET_CONFIG = 'app/SET_CONFIG';
export const setConfig = (appConfig: AppConfig): AddEntitiesAction => ({
  type: SET_CONFIG,
  payload: appConfig
});

export const ADD_ENTITIES = 'app/ADD_ENTITIES';
export const addEntities = (entities: { [key: string]: any }): AddEntitiesAction => ({
  type: ADD_ENTITIES,
  payload: entities
});

export const CLEAR_ENTITIES = 'app/CLEAR_ENTITIES';
export const clearEntities = (entitiesNames: Array<string>): ClearEntitiesAction => ({
  type: CLEAR_ENTITIES,
  payload: {
    entitiesNames
  }
});
