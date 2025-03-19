import {Alert, BackHandler} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CLIENT_ID, CLIENT_SECRET} from '@env';
import qs from 'query-string';
import {API_URL} from '../Constants/Clients';
import {requestPermissions} from 'aws-amplify/push-notifications';

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

  const requestBody = JSON.stringify({
    client_id: CLIENT_ID,
    username: userName,
    password: password,
    client_secret: CLIENT_SECRET,
    grant_type: 'password',
  });

  try {
    console.log('Inside the Try Block');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        username: userName,
        password: password,
        client_secret: CLIENT_SECRET,
        grant_type: 'password',
      }).toString(),
      // body: requestBody,
    })
      .then(x => {
        console.log('Resultttttt', x);
        return x.json();
      })
      .then(r => console.log('Error:::', r))
      .catch(eee => console.log('Refactor', eee));

    // let response = fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => {
    //     console.log('Respondse 1', response);
    //     return response.json();
    //   })
    //   .then(responseJson => {
    //     // return responseJson.movies;
    //     console.log('RESULTTTTTt', responseJson);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // console.log('Respond', response);
    // const data = await response.json();

    // console.log('LoginResult', data);
    // if (response.ok) {
    //   await saveTokens(data);
    //   return 200;
    // }
    // return handleAuthErrors(data);
  } catch (error) {
    console.error('Authentication Error:', error);
    // showErrorAlert();
  }
}

async function saveTokens(data: AuthResponse): Promise<void> {
  try {
    await EncryptedStorage.setItem('accessTokens', data.access_token);
    await EncryptedStorage.setItem('refreshToken', data.refresh_token);
    await EncryptedStorage.setItem('userStatus', 'true');
  } catch (error) {
    console.error('Token Storage Error:', error);
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
