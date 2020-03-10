import { fromJS } from 'immutable';

/*
  Merge entities
  Allow to deal with merging two entities with the same id value.
  Defaults to merge the more recently found entity onto the previous.
*/
export default (
  entities,
  state = {},
  mergeStrategy = (entityA, entityB) => entityA.merge(entityB)
) => {
  if (!entities) {
    return state;
  }

  let newState = state;

  Object.keys(entities).forEach((entityId) => {
    const newValue = newState.get(entityId)
      ? mergeStrategy(newState.get(entityId), fromJS(entities[entityId])) // If id exists in store
      : fromJS(entities[entityId]); // If new

    newState = newState.set(entityId, newValue);
  });

  return newState;
}
