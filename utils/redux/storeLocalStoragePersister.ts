import { Record, Map, fromJS } from 'immutable'
import { Store } from 'redux'

const storeKey = '_state'

const persistState = (keys: string[] = [], state: Record<object>): void => {
  let serializedState = Map()
  keys.forEach((key) => {
    serializedState = serializedState.set(key, state.get(key as never))
  })
  localStorage.setItem('_state', JSON.stringify(serializedState.toJS()))
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

export const middleware = (keys: string[] = []) => (
  (store: Store) => {
    if (typeof localStorage !== 'undefined') {
      store.subscribe(() => {
        persistState(keys, store.getState())
      })
    }
  }
)

export default middleware
