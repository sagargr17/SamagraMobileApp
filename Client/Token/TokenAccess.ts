import {AppState} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {store} from '../../StateManagement/Store';
import {logout} from '../../StateManagement/User/UserSlice';

// Token Utilization
// UseCase: API Calls,
type getTokens = () => {
  accessToken: string | null;
  refreshToken: string | null;
};

export async function getTokens() {
  // AppState.addEventListener('focus', () => console.log('INTO FOREGROUND'));
  try {
    const accessToken = await Keychain.getGenericPassword({
      service: 'accessToken',
    });
    const refreshToken = await Keychain.getGenericPassword({
      service: 'refreshToken',
    });

    console.log('ACCESSS TOKEN, REFRESH TOKEN', accessToken, refreshToken);

    return {
      accessToken: accessToken ? accessToken.password : null,
      refreshToken: refreshToken ? refreshToken.password : null,
    };
  } catch (error) {
    return {accessToken: null, refreshToken: null};
  }
}

// Clearing Token
// UseCase : Logout, UnExpected Error

type clearTokens = () => void | unknown;
export async function clearTokens() {
  try {
    await Keychain.resetGenericPassword({service: 'accessToken'});
    await Keychain.resetGenericPassword({service: 'refreshToken'});
    await Keychain.resetGenericPassword({service: 'userStatus'});
    store.dispatch(logout()); //This Logouts from the redux store too
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return error;
  }
}
