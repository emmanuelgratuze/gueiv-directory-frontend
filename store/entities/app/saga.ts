import {
  all,
  call,
  put,
  takeEvery
} from 'redux-saga/effects';

import { ADD_ENTITIES } from './actions';
import { BasicAction } from '@store/types';

function* endActionsSaga(action: BasicAction) {
  if (action.meta && action.meta.endAction) {
    const { endAction } = action.meta;
    yield put({
      type: endAction.type ? endAction.type : endAction,
      meta: endAction.meta ? endAction.meta : {},
      payload: action.payload || {}
    })
  }
}

function* appSaga() {
  yield takeEvery(ADD_ENTITIES, endActionsSaga);
}

function* rootSaga() {
  yield all([
    call(appSaga),
    // call(authSaga),
  ]);
}

export default rootSaga;