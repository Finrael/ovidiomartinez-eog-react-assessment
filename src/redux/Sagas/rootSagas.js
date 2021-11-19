import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import { getMetricAction, getMetricSaga } from './Saga';
import { getMeasurementSaga, getMeasurementsAction } from './getValuesSaga';
import { getMultipleMeasurementSaga, getMultiMeasurementsAction } from './getMultipleValuesSaga';
import { subscribtionSaga, subscriptionAction } from './subscriptionSaga';

export function* rootSaga() {
  yield all([takeLatest(getMetricAction.type, getMetricSaga),
    (takeLatest(getMeasurementsAction.type, getMeasurementSaga)),
    (takeEvery(subscriptionAction.type, subscribtionSaga)),
    (takeLatest(getMultiMeasurementsAction.type, getMultipleMeasurementSaga)),
  ]);
}
