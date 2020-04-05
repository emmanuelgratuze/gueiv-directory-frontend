import { fromJS, Record } from 'immutable'
// import { Record } from 'types/immutable'

/*
  Merge entities
  Allow to deal with merging two entities with the same id value.
  Defaults to merge the more recently found entity onto the previous.
*/
function mergeEntities(
  entities: { [key: string]: unknown } | undefined,
  state: Record<{ [key: string]: Record<{[key: string]: unknown}> }> = fromJS({}),
  mergeStrategy = (entityA: Record<{ [key: string]: unknown }>, entityB: Record<{ [key: string]: unknown }>) => entityA.merge(entityB)
): Record<{ [key: string]: Record<{ [key: string]: unknown }> }> {
  if (!entities) {
    return state
  }

  let newState = state
  Object.keys(entities).forEach((entityId) => {
    const newValue = typeof newState.get(entityId) !== 'undefined'
      ? mergeStrategy(newState.get(entityId), fromJS(entities[entityId])) // If id exists in store
      : fromJS(entities[entityId]) // If new

    newState = newState.set(entityId, newValue)
  })

  return newState
}

export default mergeEntities
