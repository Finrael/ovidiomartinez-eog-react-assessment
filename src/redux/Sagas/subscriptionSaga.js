import { eventChannel } from 'redux-saga';
// import { eventChannel } from '@redux-saga/core';
import {
  take, put, call,
} from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { client } from '../../GraphQL/client';
import subscribtionQuery from '../../GraphQL/queries/subscriptionQuery';
// import heartBeatQuery from '../../GraphQL/queries/heartbeat';
import { getValuesAction } from '../Slices/mainSlice';

const SAGA_SUBSCRIPTION = 'SAGA_SUBSCRIPTION';

// export const createSubscription = (clientProp) => eventChannel((emit) => {
//   const subscriptionData = clientProp.subscribe({ query: subscribtionQuery });
//   function onNext(value) {
//     emit(value);
//     // console.log('EMIT', emit(value));
//   }

//   const channel = subscriptionData.subscribe(onNext);
//   return channel.unsubscribe;
// });

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
      console.log('hEere');
      // yield take(SAGA_SUBSCRIPTION);
      const sub = yield take(subscription);
      console.log('hEere 2', sub);
      // yield call((data) => { console.log(data); });
      // console.log('SUBSCRIPTION', payload);
      // const currentValue = yield select((state) => state.metrics.chosenMetric);
      // const heartBeat = yield call(client.query, { query: heartBeatQuery });
      // const res = yield call(client.query, {
      //   query: subscribtionQuery,
      //   variables: {
      //     input: {
      //       metricName: currentValue[0],
      //       after: heartBeat.data.heartBeat - 1000 * 60 * 30,
      //       before: heartBeat,
      //     },
      //   },
      // });
      // yield put(getValuesAction(res.data.getMeasurements));
    } catch (e) {
      console.log('ERROR');
      yield put(getValuesAction([]));
      yield call(subscription.close);
    }
  }
}
