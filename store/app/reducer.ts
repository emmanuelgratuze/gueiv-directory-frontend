import { combineReducers } from 'redux-immutable'

import entitiesReducer from 'store/data/reducer'
import interfaceReducer from 'store/interface/reducer'

export default combineReducers({
  entities: entitiesReducer,
  interface: interfaceReducer
})
