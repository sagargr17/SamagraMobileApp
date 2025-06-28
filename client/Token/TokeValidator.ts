// This is the function i defined for the does the token is expired or not
import {decode as atob} from 'base-64';
import {getTokens} from './TokenAccess';

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
    const timeDifference = decodedToken.exp - currentTime;
    console.log('Difference', timeDifference);

    if (timeDifference > 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    // IF something went Wrong while decoding it considered as expired Token and new token will be generated
    return true;
  }
}
