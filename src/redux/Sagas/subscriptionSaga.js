import { eventChannel } from 'redux-saga';
import {
  take, put, call, select,
} from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { client } from '../../GraphQL/client';
import subscribtionQuery from '../../GraphQL/queries/subscriptionQuery';
import { getValuesAction, getRealTimeAction } from '../Slices/mainSlice';

const SAGA_SUBSCRIPTION = 'SAGA_SUBSCRIPTION';

function createSubscription(_client) {
  return eventChannel(emit => {
    function onNext(value) {
      emit(value);
    }
    const subscription = _client.subscribe({ query: subscribtionQuery });
    const channel = subscription.subscribe(onNext);
    return channel.unsubscribe;
  });
}

export const subscriptionAction = createAction(SAGA_SUBSCRIPTION);

export function* subscribtionSaga() {
  yield take(SAGA_SUBSCRIPTION);
  const subscription = yield call(createSubscription, client);
  while (true) {
    try {
      const sub = yield take(subscription);
      const currentChosen = yield select((state) => state.metrics.chosenMetric);
      const current = yield select((state) => state.metrics.realTime);
      let currentReal = [...current];
      if (currentChosen.some((element) => element === sub.data.newMeasurement.metric)) {
        const element = currentReal.some(
          (value) => value.metric === sub.data.newMeasurement.metric,
        );
        if (element) {
          currentReal = currentReal.map((ele) => {
            if (ele.metric === sub.data.newMeasurement.metric) return sub.data.newMeasurement;
            return ele;
          });
        } else currentReal.push(sub.data.newMeasurement);
        yield put(getRealTimeAction(currentReal));
      }
    } catch (e) {
      console.log('ERROR', e);
      yield put(getValuesAction([]));
      yield call(subscription.close);
    }
  }
}
