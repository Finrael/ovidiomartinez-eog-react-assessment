import {
  put, call,
} from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { getMultipleValuesAction } from '../Slices/mainSlice';
import { client } from '../../GraphQL/client';
// import getMeasurements from '../../GraphQL/queries/getMeasurements';
import heartBeatQuery from '../../GraphQL/queries/heartbeat';
import getMultipleMeasurementsQuery from '../../GraphQL/queries/getMultipleMeasurements';

export const SAGA_MULTI_MEASUREMENTS = 'saga/multi_measurements';

export const getMultiMeasurementsAction = createAction(SAGA_MULTI_MEASUREMENTS);

export function* getMultipleMeasurementSaga(param1) {
  // console.log('param1', param1);
  // console.log('para2', para2);
  try {
    const currentValue = param1.payload;
    // yield select((state) => state.metrics.chosenMetric);
    // console.log('this is the current value', currentValue);
    const heartBeat = yield call(client.query, { query: heartBeatQuery });
    const res = yield call(client.query, {
      query: getMultipleMeasurementsQuery,
      variables: {
        input: currentValue.map((element) => ({
          metricName: element,
          after: heartBeat.data.heartBeat - 1000 * 60 * 30,
          before: heartBeat,
        })),
      },
    });
    // console.log('MULTIPLE RESPONSE', res.data);
    yield put(getMultipleValuesAction(res.data.getMultipleMeasurements));
  } catch (e) {
    yield put(getMultipleValuesAction([]));
    console.log('ERROR2');
  }
}
