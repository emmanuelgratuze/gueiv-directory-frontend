import { Store } from 'redux'
import { Task } from 'redux-saga'

export interface WithSagaTaskStore extends Store {
  sagaTask?: Task;
}

export interface BasicAction {
  type: string;
  meta?: {
    [key: string]: unknown;
  };
  payload?: {
    [key: string]: unknown;
  };
}
