import { takeLatest, all } from 'redux-saga/effects';
import { getMetricAction, getMetricSaga } from './Saga';
import { getMeasurementSaga, getMeasurementsAction } from './getValuesSaga';
import { getMultipleMeasurementSaga, getMultiMeasurementsAction } from './getMultipleValuesSaga';

export function* rootSaga() {
  yield all([takeLatest(getMetricAction.type, getMetricSaga),
    (takeLatest(getMeasurementsAction.type, getMeasurementSaga)),
    (takeLatest(getMultiMeasurementsAction.type, getMultipleMeasurementSaga)),
  ]);
}
