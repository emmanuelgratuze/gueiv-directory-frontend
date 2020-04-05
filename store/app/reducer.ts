import { combineReducers } from 'redux-immutable'

import dataReducer from 'store/data/reducer'
import interfaceReducer from 'store/interface/reducer'

export default combineReducers({
  data: dataReducer,
  interface: interfaceReducer
})
