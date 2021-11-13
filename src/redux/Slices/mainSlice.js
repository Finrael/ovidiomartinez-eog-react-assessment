import { createSlice } from '@reduxjs/toolkit';
import initialMetrics from '../initialStates/metrics';

export const metricSlice = createSlice({
  name: 'metricsSlice',
  initialMetrics,
  reducers: {
    getMetrics: (state, action) => {
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

export const { getMetricsAction, removeMetric, addMetric } = metricSlice.actions;
