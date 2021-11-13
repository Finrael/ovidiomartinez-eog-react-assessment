import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { getMetricsAction } from '../Slices/mainSlice';
import { client } from '../../GraphQL/client';
import getMetricsQuery from '../../GraphQL/queries/getMetricsQuery';

export const SAGA_METRICS = 'saga/metrics';

export const getMetricAction = createAction(SAGA_METRICS);

export function* getMetrics() {
  try {
    const res = yield call(client.query, { query: getMetricsQuery });
    console.log('THIS IS THE RESPONSE', res);
  } catch (e) {
    yield put(getMetricsAction([]));
  }
}

export function* getMetricWatcher() {
  yield takeEvery(SAGA_METRICS, getMetrics);
}
