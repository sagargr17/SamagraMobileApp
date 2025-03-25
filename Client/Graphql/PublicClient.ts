// ReUsable Code for the Public Client
// USECASE : Automation for Repeated calling the NON-Authenticated API

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {GRAPHQL_ENDPOINT} from '../../Constants/SamagraConstants/SamagraEndpoints';

// export const GetPublicClient =  () =>
//  return async () =>{new ApolloClient({
//     uri: GRAPHQL_ENDPOINT,
//     headers: {
//       'content-type': 'application/json',
//     },
//     cache: new InMemoryCache(),
//   })}
export default function useGetClient() {
  return async () => {
    return new ApolloClient({
      uri: 'http://api.samagranepal.com/graphql/',
      headers: {
        'content-type': 'application/json',
        // "Authorization": token
      },
      cache: new InMemoryCache(),
    });
  };
}
