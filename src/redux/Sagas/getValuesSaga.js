import {
  select, put, call,
} from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { getValuesAction } from '../Slices/mainSlice';
import { client } from '../../GraphQL/client';
import getMeasurements from '../../GraphQL/queries/getMeasurements';
import heartBeatQuery from '../../GraphQL/queries/heartbeat';

export const SAGA_MEASUREMENTS = 'saga/measurements';

export const getMeasurementsAction = createAction(SAGA_MEASUREMENTS);

export function* getMeasurementSaga() {
  try {
    const currentValue = yield select((state) => state.metrics.chosenMetric);
    const heartBeat = yield call(client.query, { query: heartBeatQuery });
    const res = yield call(client.query, {
      query: getMeasurements,
      variables: {
        input: {
          metricName: currentValue[0],
          after: heartBeat.data.heartBeat - 1000 * 60 * 30,
          before: heartBeat,
        },
      },
    });
    yield put(getValuesAction(res.data.getMeasurements));
  } catch (e) {
    yield put(getValuesAction([]));
    console.log('ERROR');
  }
}
