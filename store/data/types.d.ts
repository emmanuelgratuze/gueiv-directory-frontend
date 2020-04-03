import { SchemaObject } from 'normalizr'
import schemas from 'store/data/schemas'

import { BasicAction } from '../types'

export const ADD_ENTITIES = 'app/ADD_ENTITIES'
export const CLEAR_ENTITIES = 'app/CLEAR_ENTITIES'

export interface AddEntitiesAction extends BasicAction {
  type: typeof ADD_ENTITIES;
  payload: {
    entities: unkown;
  };
  meta?: {
    schema: SchemaObject<unknown>;
    endAction: BasicAction;
  };
}

export interface ClearEntitiesAction {
  type: typeof CLEAR_ENTITIES;
  payload: {
    entitiesNames: string[];
  };
}

export type ImmutableEntities = Record<Entities>


// type NetlifyCMSWidgetsFieldTypes = {
//   text: string;
//   boolean: boolean;
//   code: string;
//   date: string;
//   datetime: string;
//   file: string | string[];
//   image: string;
//   // list: '';
//   // map: '';
//   markdown: string;
//   number: number;
//   object: object;
//   relation: string;
//   select: '';
//   string: '';
// }