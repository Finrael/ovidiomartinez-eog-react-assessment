import {
  call, put,
} from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { getMetricsAction, setMetricsAction } from '../Slices/mainSlice';
import { client } from '../../GraphQL/client';
import getMetricsQuery from '../../GraphQL/queries/getMetricsQuery';
// import initialMetrics from '../initialStates/metrics';

export const SAGA_METRICS = 'saga/metrics';

export const getMetricAction = createAction(SAGA_METRICS);

export function* getMetricSaga() {
  try {
    const res = yield call(client.query, { query: getMetricsQuery });
    yield put(setMetricsAction(res.data.getMetrics));
  } catch (e) {
    yield put(getMetricsAction([]));
  }
}
