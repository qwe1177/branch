/* eslint-disable no-constant-condition */

import {delay} from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'


export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
