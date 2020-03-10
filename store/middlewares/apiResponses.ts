import { normalize } from 'normalizr';
import { ADD_ENTITIES } from '../entities/app/actions';
import { Dispatch } from 'redux';
import { BasicAction } from '@store/types';

/* Reponse middleware:
- Clean api keys (to camelcase)
- Normalize data
*/
export default () => (next: Dispatch) => (action: BasicAction): void => {
  // Normalize when action type = ADD_ENTITIES
  const normalizedPayload = action.type === ADD_ENTITIES && action.meta && action.meta.schema
    ? normalize(action.payload, action.meta.schema)
    : action.payload;

  if (action.payload) {
    next({
      ...action,
      payload: normalizedPayload
    });
  } else {
    next(action);
  }
};
