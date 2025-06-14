import {CLIENT_ID, CLIENT_SECRET} from '@env';
import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {API_URL} from '../../Constants/SamagraConstants/SamagraEndpoints';
import {store} from '../../StateManagement/Store';
import {login} from '../../StateManagement/User/UserSlice';
import {
  hideLoader,
  showLoader,
} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {Icon, showMessage} from 'react-native-flash-message';
import {MyTheme, responseTheme, size} from '../../Prefrences/Prefrences';
import {AreaMapper} from '../../Utilities/CustomMethods';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  error_description?: string;
}

type Authenticator = (
  userName: string,
  password: string,
) =>
  | number
  | {
      status: string;
      message: string;
    };
async function Authenticator(userName: string, password: string) {
  store.dispatch(showLoader());
  const requestBody = new URLSearchParams({
    client_id: CLIENT_ID,
    username: userName,
    password: password,
    client_secret: CLIENT_SECRET,
    grant_type: 'password',
  }).toString();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: requestBody,
    });
    const data = await response.json();

    if (response.ok) {
      await saveTokens(data);
      store.dispatch(hideLoader());
      return 200;
    }

    return handleAuthErrors(data);
  } catch (error) {
    showMessage(
      responseTheme(
        'Invalid Credential',
        'Please validate your credentials and Try again later !!',
        'danger',
      ),
    );

    return 400;
  }
}

export async function saveTokens(data: AuthResponse): Promise<void> {
  console.log('Refreshed Token Data', data);

  try {
    await Keychain.setGenericPassword('accessToken', data.access_token, {
      service: 'accessToken',
    });
    await Keychain.setGenericPassword('refreshToken', data.refresh_token, {
      service: 'refreshToken',
    });
    await Keychain.setGenericPassword('userStatus', 'true', {
      service: 'userStatus',
    });
    store.dispatch(
      login({
        isAuthenticated: true,
      }),
    );
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
}

function handleAuthErrors(data: AuthResponse): number {
  const errorMap: Record<string, number> = {
    ERPNNC: 401,
    ERIUC: 402,
  };
  let result = errorMap[data.error_description || ''] || 400;

  showMessage(
    responseTheme(
      `${
        result === 402
          ? 'Incorrect Password'
          : result === 401
          ? 'Invalid PhoneNumber'
          : 'Something WentWrong'
      }`,
      `${
        result === 402
          ? 'Please Check Your Password and try again'
          : result === 401
          ? 'Validate Your PhoneNumber and Try Again!'
          : 'We are trying to fix and reach you back!'
      }`,
      'danger',
    ),
  );

  return result;
}

export default Authenticator;
