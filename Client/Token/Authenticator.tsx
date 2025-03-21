import {CLIENT_ID, CLIENT_SECRET} from '@env';
import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {API_URL} from '../../Constants/SamagraEndpoints';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  error_description?: string;
}

async function Authenticator(
  userName: string,
  password: string,
): Promise<number | void> {
  console.log(
    'Authenticating user:',
    userName,
    password,
    CLIENT_ID,
    CLIENT_SECRET,
  );

  const requestBody = new URLSearchParams({
    client_id: CLIENT_ID,
    username: userName,
    password: password,
    client_secret: CLIENT_SECRET,
    grant_type: 'password',
  }).toString();

  try {
    console.log('Inside the Try Block');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: requestBody,
    });
    const data = await response.json();
    console.log('respond', response.ok);
    if (response.ok) {
      await saveTokens(data);
      return 200;
    }
    return handleAuthErrors(data);
  } catch (error) {
    console.error('Authentication Error:', error);
    return 400;
    showErrorAlert();
  }
}

async function saveTokens(data: AuthResponse): Promise<void> {
  console.log('Savinggg token1');
  try {
    console.log('SAving Token', data);
    await Keychain.setGenericPassword('accessToken', data.access_token, {
      service: 'accessToken',
    });
    await Keychain.setGenericPassword('refreshToken', data.access_token, {
      service: 'refreshToken',
    });
    await Keychain.setGenericPassword('userStatus', 'true', {
      service: 'userStatus',
    });
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

  return errorMap[data.error_description || ''] || 400;
}

function showErrorAlert(): void {
  Alert.alert(
    'Something Went Wrong',
    'Please try again or check your internet connection.',
    [
      {text: 'Cancel', onPress: () => null, style: 'cancel'},
      // {text: 'Ok', onPress: () => BackHandler.exitApp()},
    ],
  );
}

export default Authenticator;
