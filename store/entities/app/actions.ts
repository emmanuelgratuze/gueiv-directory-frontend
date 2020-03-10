import { AddEntitiesAction, ClearEntitiesAction } from "./types";

export const ADD_ENTITIES = 'app/ADD_ENTITIES';
export const CLEAR_ENTITIES = 'app/CLEAR_ENTITIES';

export const addEntities = (entities: { [key: string]: any }): AddEntitiesAction => ({
  type: ADD_ENTITIES,
  payload: entities
});

export const clearEntities = (entitiesNames: Array<string>): ClearEntitiesAction => ({
  type: CLEAR_ENTITIES,
  payload: {
    entitiesNames
  }
});
