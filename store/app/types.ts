import { Record } from 'immutable'
import { SchemaObject } from 'normalizr'
import { BasicAction } from '../types'
import { Criterion } from '../entities/criteria/types'
import { Brand } from '../entities/brands/types'
import { InterfaceStateTree } from '../interface/types'

export const ADD_ENTITIES = 'app/ADD_ENTITIES'
export const CLEAR_ENTITIES = 'app/CLEAR_ENTITIES'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppEntities {
  criteria?: {
    [key: string]: Criterion;
  };
  brands?: {
    [key: string]: Brand;
  };
}

export interface AppState {
  entities: AppEntities;
  interface: InterfaceStateTree;
}

export interface AddEntitiesAction extends BasicAction {
  type: typeof ADD_ENTITIES;
  payload: {
    entities: AppEntities;
  };
  meta?: {
    schema: SchemaObject<unknown>;
    endAction: BasicAction;
  };
}

export interface ClearEntitiesAction {
  type: typeof CLEAR_ENTITIES;
  payload: {
    entitiesNames: keyof AppEntities;
  };
}

export type ImmutableAppState = Record<AppState>
export type ImmutableAppEntities = Record<AppEntities>
