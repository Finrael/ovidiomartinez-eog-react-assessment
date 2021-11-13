import { configureStore } from '@reduxjs/toolkit';
import metricSlice from './Slices/mainSlice';

export const store = configureStore({
  reducer: {
    metrics: metricSlice,
  },
//   middleware: [sagas.sagaMiddleware],
});
