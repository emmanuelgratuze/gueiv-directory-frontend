import { memoize } from 'lodash';
import { Map } from 'immutable';

/*
  Get state tree depending on entities keys
  Result is memoized (default by JSON representation)
*/
const getStateTreeByKeys = memoize((keys, state) => (
  Map(keys.map((key) => [key, state.get(key)]))
), (keys, state, onlyUpdateOnStructuralChanges = false) => (
  onlyUpdateOnStructuralChanges
    // memoize by format reference : <key>:<length>|<key2>:<length2>|...
    ? keys.reduce((id, key) => (
      `${id}|${key}:${(state.get(key) || Map()).keySeq().toArray().length}`
    ), '')
    // memoize acurately (update anytime something changes)
    : JSON.stringify(Map(keys.map((key) => [key, state.get(key)])))
));

/*
  Allow selecting a specific portion of state
  depending on schema used for denormalization (given as parameter)
  This prevents selecting the entire store as parameter
  in the app selectors (and triggering an update on every state change)
*/
export const selectStateTreeBySchemas = (
  schemasInput,
  { onlyUpdateOnStructuralChanges = false } = {}
) => (
  (state) => {
    const stateKeys = schemasInput
      // Remove non schema types
      .filter(schema => !!schema.schema)
      .reduce((schemas, schema) => (
        schemas.concat(Object.values(schema.schema))
      ), [schemasInput])
      .map((schema) => (
        Array.isArray(schema) ? schema[0].key : schema.key
      ));

    const statePortion = getStateTreeByKeys(
      [...new Set(stateKeys)], // remove duplicates
      state,
      onlyUpdateOnStructuralChanges
    );

    return statePortion;
  }
);

export default {};
