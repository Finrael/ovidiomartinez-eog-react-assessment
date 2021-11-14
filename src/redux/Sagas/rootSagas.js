import { takeLatest } from 'redux-saga/effects';
import { getMetricAction, getMetricSaga } from './Saga';

export function* rootSaga() {
  yield takeLatest(getMetricAction.type, getMetricSaga);
}
