// This is the function i defined for the does the token is expired or not

import {decode as atob} from 'base-64';
import {accessTokenGenerator} from './AccessTokenGenerator';
import {clearTokens, getTokens} from './TokenAccess';
import {useEffect, useRef} from 'react';

// Parse JWT
function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c: any) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  return JSON.parse(jsonPayload);
}

// Checks Weather the Toke is Expired or not
type isTokenExpired = () => Boolean | number;
export async function isTokenExpired() {
  const {accessToken} = await getTokens();
  if (!accessToken) {
    return true; //The meaning of true is expired
  }

  try {
    const decodedToken = await parseJwt(accessToken);
    // console.log('DEconding Token', decodedToken);
    const currentTime = Math.floor(Date.now() / 1000); // curent ko time in seconds
    console.log('currentTime', currentTime, decodedToken.exp);
    return decodedToken.exp
      ? decodedToken.exp > currentTime
        ? decodedToken.exp - currentTime
        : true
      : true;
  } catch (error) {
    console.error('Error decoding token:', error);
    // IF something went Wrong while decoding it considered as expired Token and new token will be generated
    return true;
  }
}

// This is the function i defined for refreshing on the basis of TIME
type startTokenRefreshTimer = () => void;
// export async function startTokenRefreshTimer(refreshingTime: number) {
//   console.log('REfreshing the TOken', refreshingTime);
//   const {refreshToken} = await getTokens();
//   if ((await isTokenExpired()) === true)
//     setInterval(async () => {
//       console.log('Time Refreshingggg', refreshingTime);
//       // Refresh token logic
//       if (refreshToken) {
//         console.log('Refreshing', refreshingTime);

//         // accessTokenGenerator(refreshToken); //Refresh The Time
//       } else {
//         await clearTokens(); //It means if somethig goes wrong while refreshing  it will logout and clear the token
//       }
//     }, refreshingTime); //Here the Refreshing time is in milisecond
// }
