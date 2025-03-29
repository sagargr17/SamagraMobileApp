// import {ApolloLink, createHttpLink} from '@apollo/client';
// import {saveTokens} from '../Token/Authenticator';
// import {clearTokens, getTokens} from '../Token/TokenAccess';
// import {GRAPHQL_ENDPOINT} from '../../Constants/SamagraConstants/SamagraEndpoints';
// import {accessTokenGenerator} from '../Token/AccessTokenGenerator';
// import * as Keychain from 'react-native-keychain';

// export const httpLink = createHttpLink({uri: GRAPHQL_ENDPOINT});

// // This File is Not Completed
// export const authLink = new ApolloLink(async (operation: any, forward: any) => {
//   // Operational Content
//   operation.setContext({
//     headers: {
//       authorization: accessToken ? `Bearer ${accessToken}` : '',
//     },
//   });

//   return forward(operation).map(async (response: any) => {
//     console.log('AUTH Link Respond', response);

//     if (response.errors && response.errors[0].message === 'Unauthorized') {
//       if (refreshToken) {
//         try {
//           const accessToken: string = await Keychain.getGenericPassword({
//             service: 'accessToken',
//           });
//           const refreshResponse = await accessTokenGenerator(accessToken);
//           console.log('Refreshhh Tokennnn', refreshResponse);

//           if (refreshResponse.ok) {
//             const jsonRefreshedToken = await refreshResponse.json();
//             const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
//               jsonRefreshedToken;
//             await saveTokens(jsonRefreshedToken);

//             operation.setContext({
//               headers: {
//                 authorization: `Bearer ${newAccessToken}`,
//               },
//             });

//             return forward(operation);
//           } else {
//             await clearTokens();
//           }
//         } catch (refreshError) {
//           console.error('Error refreshing token:', refreshError);
//           await clearTokens();
//           // Redirect to login
//         }
//       } else {
//         await clearTokens();
//         // Redirect to login
//       }
//     }
//     return response;
//   });
// });
