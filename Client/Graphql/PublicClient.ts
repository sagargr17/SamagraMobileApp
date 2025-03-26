// ReUsable Code for the Public Client
// USECASE : Automation for Repeated calling the NON-Authenticated API

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {GRAPHQL_ENDPOINT} from '../../Constants/SamagraConstants/SamagraEndpoints';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://api.samagranepal.com/graphql/',
  headers: {
    'content-type': 'application/json',
    // "Authorization": token
  },
  cache: new InMemoryCache(),
});
