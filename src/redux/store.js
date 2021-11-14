import { configureStore } from '@reduxjs/toolkit';
import metricSlicePart from './Slices/mainSlice';
import { SagasMiddleware } from './Sagas';
import { rootSaga } from './Sagas/rootSagas';
// import initialMetrics from './initialStates/metrics';

export const store = configureStore({
  reducer: {
    metrics: metricSlicePart,
  },
  middleware: [SagasMiddleware],
});

SagasMiddleware.run(rootSaga);
