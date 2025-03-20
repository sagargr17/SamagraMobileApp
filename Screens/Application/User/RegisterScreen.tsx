import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'my_endpoint',
  headers: {
    'content-type': 'application/json',
    // "Authorization": token
  },
  cache: new InMemoryCache(),
});
