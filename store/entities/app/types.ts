import { BasicAction } from "@store/types";

export interface AddEntitiesAction extends BasicAction {
  payload: {
    [key: string]: any
  },
  meta?: {
    endAction: BasicAction
  }
}

export interface ClearEntitiesAction {
  type: string,
  payload: {
    entitiesNames: Array<string>
  }
}
