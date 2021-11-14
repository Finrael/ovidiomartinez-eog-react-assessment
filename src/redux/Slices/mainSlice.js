import { createSlice } from '@reduxjs/toolkit';
import initialMetrics from '../initialStates/metrics';

export const metricSlice = createSlice({
  name: 'metrics',
  initialState: initialMetrics,
  reducers: {
    getMetricsAction: (state, action) => {
      state.metrics = action.payload;
    },
    setMetricsAction: (state, action) => {
      state.metrics = action.payload;
    },
    removeMetric: (state, action) => {
      const removed = action.payload;
      const { metrics } = state;
      state.metrics = metrics.filter((record) => record.metric !== removed);
    },
    addMetric: (state, action) => {
      const added = action.payload;
      state.metrics.push(added);
    },

  },
});

export const {
  getMetricsAction, removeMetric, addMetric, setMetricsAction,
} = metricSlice.actions;
export default metricSlice.reducer;
