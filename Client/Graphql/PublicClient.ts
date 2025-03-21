// ReUsable Code for the Public Client
// USECASE : Automation for Repeated calling the NON-Authenticated API

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {GRAPHQL_ENDPOINT} from '../../Constants/SamagraEndpoints';
import {getTokens} from '../Token/TokenAccess';

async function tokenHandle() {
  const tokens = await getTokens();
  return tokens.accessToken;
}

export const GetAuthenticateClient = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
  cache: new InMemoryCache(),
});
