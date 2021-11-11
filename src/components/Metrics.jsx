import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import MetricSelector from './MetricSelector';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const Metrics = () => {
  const [availableMetrics, setAvailableMetrics] = React.useState([]);
  const query = gql`
    query  {
      getMetrics
      }
  `;
  const { data } = useQuery(query);
  const getMetrics = () => {
    setAvailableMetrics(data.getMetrics);
  };
  return (
    <div>
      <ApolloProvider client={client}>
        <input type='button' value='testQuery' onClick={getMetrics} />
        <MetricSelector metricsAvailable={availableMetrics} />
      </ApolloProvider>
    </div>
  );
};
export default Metrics;
