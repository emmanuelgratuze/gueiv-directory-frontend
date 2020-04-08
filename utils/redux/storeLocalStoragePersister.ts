import { Record, Map, fromJS } from 'immutable'
import { Store } from 'redux'

const storeKey = 'app-state'

const persistState = (keys: string[][] = [], state: Record<object>): void => {
  let serializedState = Map()
  keys.forEach((key) => {
    serializedState = serializedState.setIn(key, state.getIn(key as never))
  })
  localStorage.setItem(storeKey, JSON.stringify(serializedState.toJS()))
}

export const getStateFromLocalStorage = (): Map<unknown, unknown> => {
  let state = Map()

  if (typeof localStorage === 'undefined') {
    return state
  }

  const stateString = localStorage.getItem(storeKey)
  if (stateString) {
    state = fromJS(JSON.parse(stateString))
  }

  return state
}

export const listener = (keys: string[][] = []) => (
  (store: Store) => {
    if (typeof localStorage !== 'undefined') {
      store.subscribe(() => {
        persistState(keys, store.getState())
      })
    }
  }
)

export default listener
