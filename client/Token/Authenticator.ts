import {CLIENT_ID, CLIENT_SECRET} from '@env';
import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {API_URL} from '../../Constants/SamagraConstants/SamagraEndpoints';
import {store} from '../../StateManagement/Store';
import {login} from '../../StateManagement/User/UserSlice';
import {
  hideLoader,
  showLoader,
} from '../../StateManagement/Error&loadingHandle/LoaderState';
import {showMessage} from 'react-native-flash-message';
import {MyTheme} from '../../Prefrences/Prefrences';
import {SamagraScaller} from '../../Utilities/CustomMethods';

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

    console.log('Response while calling', data);

    return handleAuthErrors(data);
  } catch (error) {
    console.log('Catch Handle', error);
    showMessage({
      message: 'Invalid Credentials',
      description: 'Your Id or Password may mismatched !',
      type: 'danger',

      textStyle: {
        fontFamily: MyTheme.fonts.regular.fontFamily,
        fontWeight: 'regular',
        fontSize: SamagraScaller({
          value: 14,
          scaleBy: 'average',
        }),
      },
      statusBarHeight: SamagraScaller({
        value: 15,
        scaleBy: 'average',
      }),
      // hideStatusBar: true,
    });
    store.dispatch(hideLoader());

    // console.error('Authentication Error:', error);
    // showErrorAlert();
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
        // id: 1,
        // name: 'sagar',
        // email: 'sagarsoocer@gmail.com',
        isAuthenticated: true,
      }),
    );
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
}

function handleAuthErrors(data: AuthResponse): number {
  console.log('Authentication Failed:', data);

  const errorMap: Record<string, number> = {
    ERPNNC: 401,
    ERIUC: 402,
  };
  let result = errorMap[data.error_description || ''] || 400;
  return result;
}

export default Authenticator;
