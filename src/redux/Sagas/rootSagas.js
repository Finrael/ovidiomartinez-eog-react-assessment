import { all, call, spawn } from 'redux-saga/effects';
import { getMetricWatcher } from './Saga';

export function* rootSaga() {
  const sagas = [getMetricWatcher];

  yield all(
    sagas.map((saga) => (
      spawn(function* generator() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.warning(e);
          }
        }
      })
    )),
  );
}
