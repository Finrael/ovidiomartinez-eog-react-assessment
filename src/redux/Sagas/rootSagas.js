import { takeLatest, all } from 'redux-saga/effects';
import { getMetricAction, getMetricSaga } from './Saga';
import { getMeasurementSaga, getMeasurementsAction } from './getValuesSaga';

export function* rootSaga() {
  yield all([takeLatest(getMetricAction.type, getMetricSaga),
    (takeLatest(getMeasurementsAction.type, getMeasurementSaga))]);
}
