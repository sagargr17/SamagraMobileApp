// ReUsable Code for the Autheticate Client
// USECASE : Automation for Repeated calling the authenticated API

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
    Authorization: `${tokenHandle() !== null ? tokenHandle() : null}`,
  },
  cache: new InMemoryCache(),
});
