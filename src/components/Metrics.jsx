import React, { useEffect } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { getMetricAction } from '../redux/Sagas/Saga';
import MetricSelector from './MetricSelector';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const Metrics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMetricAction());
  });
  const metricsValue = useSelector((state) => state.metrics.metrics);
  return (
    <div>
      <ApolloProvider client={client}>
        <MetricSelector metricsAvailable={metricsValue} />
      </ApolloProvider>
    </div>
  );
};
export default Metrics;
