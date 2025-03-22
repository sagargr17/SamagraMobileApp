import {clearTokens, getTokens} from './TokenAccess';
import {jwtDecode} from 'jwt-decode';

// This is the function i defined for the does the token is expired or not
async function isTokenExpired() {
  const {accessToken} = await getTokens();
  if (!accessToken) {
    return true; //The meaning of true is expired
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000); // curent ko time in seconds
    return decodedToken.exp
      ? decodedToken.exp < currentTime
        ? decodedToken.exp - currentTime
        : true
      : true;
  } catch (error) {
    console.error('Error decoding token:', error);
    // IF something went Wrong while decoding it considered as expired Token and new token will be generated
    return true;
  }
}

// This is the function i defined for refreshing on the basis of time
async function startTokenRefreshTimer() {
  setInterval(async () => {
    if (await isTokenExpired()) {
      // Refresh token logic
      const {refreshToken} = await getTokens();
      if (refreshToken) {
        // ... refresh token logic.
      } else {
        await clearTokens();
        // redirect to login.
      }
    }
  }, 6000);
}
