import {
  all,
  call,
  put,
  takeEvery
} from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { ADD_ENTITIES, AddEntitiesAction } from './types'

function* endActionsSaga(action: AddEntitiesAction): SagaIterator {
  if (action.meta && action.meta.endAction) {
    const { endAction } = action.meta
    yield put({
      type: endAction.type ? endAction.type : endAction,
      meta: endAction.meta ? endAction.meta : {},
      payload: action.payload || {}
    })
  }
}

function* appSaga(): SagaIterator {
  yield all([
    takeEvery(ADD_ENTITIES, endActionsSaga)
  ])
}

export const rootSaga = function* root(): SagaIterator {
  yield all([
    call(appSaga)
  ])
}

export default {}
