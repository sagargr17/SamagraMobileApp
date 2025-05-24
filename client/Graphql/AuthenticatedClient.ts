// ReUsable Code for the Autheticate Client
// USECASE : Automation for Repeated calling the authenticated API

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {GRAPHQL_ENDPOINT} from '../../Constants/SamagraConstants/SamagraEndpoints';
import {getTokens} from '../Token/TokenAccess';

async function tokenHandler() {
  const {accessToken} = await getTokens();
  return accessToken;
}

export const GetAuthenticateClient = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    'content-type': 'application/json',
    // Authorization: `Bearer ${tokenHandler() !== null ? tokenHandler() : null}`,
  },
  cache: new InMemoryCache(),
});
