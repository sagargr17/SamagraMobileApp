import {getTokens} from './TokenAccess';
import {jwtDecode} from 'jwt-decode';

async function isTokenExpired() {
  const {accessToken} = await getTokens();
  if (!accessToken) {
    return true; //The meaning of true is expired
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp ? decodedToken.exp < currentTime : true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Assume expired if decoding fails
  }
}
