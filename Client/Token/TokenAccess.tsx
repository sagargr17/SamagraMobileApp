import * as Keychain from 'react-native-keychain';

// Token Utilization
// UseCase: API Calls,
export async function getTokens(): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> {
  try {
    const accessToken = await Keychain.getGenericPassword({
      service: 'accessToken',
    });
    const refreshToken = await Keychain.getGenericPassword({
      service: 'refreshToken',
    });

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
export async function clearTokens(): Promise<void | unknown> {
  try {
    await Keychain.resetGenericPassword({service: 'accessToken'});
    await Keychain.resetGenericPassword({service: 'refreshToken'});
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return error;
  }
}
