import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const Metrics = () => {
  const query = gql`
    query  {
      getMetrics
      }
  `;
  const { data } = useQuery<any>(query);
  const getMetrics = () => {
    let returnedMetrics = '';
    returnedMetrics = data;
    console.log('these are the metrics', returnedMetrics);
  };
  return (
    <div>
      <ApolloProvider client={client}>
        <input type='button' value='testQuery' onClick={getMetrics} />
      </ApolloProvider>
    </div>
  );
};
export default Metrics;
