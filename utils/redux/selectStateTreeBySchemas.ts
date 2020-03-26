import { memoize } from 'lodash'
import { Map, Record } from 'immutable'
import { Schema, schema } from 'normalizr'

/*
  Get state tree depending on entities keys
  Result is memoized (default by JSON representation)
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStateTreeByKeys = memoize((keys, state, onlyUpdateOnStructuralChanges) => (
  Map(keys.map((key: string) => [key, state.get(key)]))
), (keys, state, onlyUpdateOnStructuralChanges = false) => (
  onlyUpdateOnStructuralChanges
    // memoize by format reference : <key>:<length>|<key2>:<length2>|...
    ? keys.reduce((id: string, key: string) => (
      `${id}|${key}:${(state.get(key) || Map()).keySeq().toArray().length}`
    ), '')
    // memoize acurately (update anytime something changes)
    : JSON.stringify(Map(keys.map((key: string) => [key, state.get(key)])))
))

/*
  Allow selecting a specific portion of state
  depending on schema used for denormalization (given as parameter)
  This prevents selecting the entire state as parameter
  in the app selectors (and triggering an update on every state change)
*/
// export const selectStateTreeBySchemas = (
//   inputSchemas: { schema: Schema }[],
//   { onlyUpdateOnStructuralChanges = false } = {}
// ) => (
//   (state: Record<{[key: string]: unknown}>) => {
//     const stateSchemas: Schema[] = inputSchemas
//       // Remove non schema types
//       .filter(inputSchema => !!inputSchema.schema)
//       .reduce((outputSchemas, inputSchema) => (
//         inputSchema.concat(Object.values(schema.schema))
//       ), [inputSchemas])

//     // TODO: Should use normalizr types instead of any
//     const stateKeys = stateSchemas
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .map((schema: any): string => (
//         Array.isArray(schema) ? schema[0].key : schema.key
//       ))

//     const statePortion = getStateTreeByKeys(
//       [...Array.from(new Set(stateKeys))], // remove duplicates
//       state,
//       onlyUpdateOnStructuralChanges
//     )

//     return statePortion
//   }
// )

export default {}
