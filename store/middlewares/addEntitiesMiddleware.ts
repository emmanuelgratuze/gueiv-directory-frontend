import { normalize } from 'normalizr'
import { Dispatch } from 'redux'
import { ADD_ENTITIES, AddEntitiesAction } from '~/store/data/types.d'

/* Reponse middleware:
- Clean api keys (to camelcase)
- Normalize data
*/
export default () => (next: Dispatch) => (action: AddEntitiesAction): void => {
  const normalizedPayload = action.type === ADD_ENTITIES && action.meta && action.meta.schema
    ? normalize(action.payload, action.meta.schema)
    : action.payload

  if (action.payload) {
    next({
      ...action,
      payload: normalizedPayload
    })
  } else {
    next(action)
  }
}
