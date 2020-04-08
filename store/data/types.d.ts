import { SchemaObject } from 'normalizr'
import { BasicAction } from '../types'
import * as schemas from './schemas'

export const ADD_DATA = 'app/ADD_DATA'
export const CLEAR_DATA = 'app/CLEAR_DATA'

export type SchemaKeys = keyof (typeof schemas)

export interface AddDataAction extends BasicAction {
  type: typeof ADD_DATA;
  payload: {
    schema: SchemaKeys | SchemaKeys[];
    data: Data[];
  };
  meta?: {
    schema: SchemaObject<unknown>;
    endAction: BasicAction;
  };
}

export interface ClearDataAction {
  type: typeof CLEAR_DATA;
  payload: {
    entitiesNames: string[];
  };
}

export type Data = {
  [key: string]: unknown;
}

export type ImmutableData = Record<{
  [key: string]: Record<unknown>;
}>

export type ImmutableDataTree = Record<{
  [key: string]: ImmutableData;
}>
