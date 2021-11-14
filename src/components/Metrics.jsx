import React, { useEffect } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  // useQuery,
  // gql,
  InMemoryCache,
} from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
// import { getMetricsAction } from '../redux/Slices/mainSlice';
import { getMetricAction } from '../redux/Sagas/Saga';
import MetricSelector from './MetricSelector';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const Metrics = () => {
  const [availableMetrics, setAvailableMetrics] = React.useState([]);
  const dispatch = useDispatch();

  // const query = gql`
  //   query  {
  //     getMetrics
  //     }
  // `;
  // const { data } = useQuery(query);
  const getMetrics = () => {
    setAvailableMetrics(availableMetrics);
  };
  useEffect(() => {
    // getMetrics();
    dispatch(getMetricAction());
  });
  const metricsValue = useSelector((state) => {
    console.log('ESTE ES EL ESTADO', state);
    return state.metrics.metrics;
  });
  console.log('RE', metricsValue);
  // getMetrics(metricsValue);
  // useEffect(() => {
  //   getMetrics(metricsValue);
  // }, [metricsValue]);
  return (
    <div>
      <ApolloProvider client={client}>
        <input type='button' value='testQuery' onClick={getMetrics} />
        <MetricSelector metricsAvailable={metricsValue} />
      </ApolloProvider>
    </div>
  );
};
export default Metrics;
