import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AppState, StatusBar, useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider, useSelector} from 'react-redux';
import {accessTokenGenerator} from './client/Token/AccessTokenGenerator';
import {getTokens} from './client/Token/TokenAccess';
import {isTokenExpired} from './client/Token/TokeValidator';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';
import {useTokenRefreshTimer} from './CustomHooks/useTokenRefreshTimer';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyDarkTheme, MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';
import {login, logout} from './StateManagement/User/UserSlice';
import BootSplash from 'react-native-bootsplash';

// MAin Fuction To Token Refresh Handle
const isTokennExpireHandle = async () => {
  const isTokenExpiredStatus = await isTokenExpired();

  return isTokenExpiredStatus;
};

// Initialize Apollo Client
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// Main Modules
function App(): React.JSX.Element {
  const scheme = useColorScheme(); // Get the current color scheme
  const [themes, setTheme] = useState(MyTheme); // Default to light theme
  const [refreshingTime, setRefreshingTime] = useState<number>(10000); // This is the time of refreshing in the second

  useEffect(() => {
    const hide = async () => {
      await BootSplash.hide({fade: true});
    };
    hide();
  }, []);

  //This is the useEffect Function for changing the dark and bright mode
  useEffect(() => {
    if (scheme === 'dark') {
      setTheme(MyDarkTheme);
    } else {
      setTheme(MyTheme);
    }
  }, [scheme]);

  // Code To mnake User Login
  useEffect(() => {
    const getUserStatusHandle = async () => {
      const {userStatus, accessToken, refreshToken} = await getTokens();
      console.log('USER STATUSSSs', userStatus, accessToken, refreshToken);

      userStatus === 'true'
        ? store.dispatch(
            login({
              id: 1,
              email: 'sagar@gmail.com',
              name: 'sagar',
            }),
          )
        : store.dispatch(logout());
    };
    getUserStatusHandle();
  }, []);

  //This is the code for the refresh token , when the app is coming from , background to foreground
  AppState.addEventListener('focus', async () => {
    const {userStatus, accessToken, refreshToken} = await getTokens();

    // console.log('User token status ', userStatus, accessToken, refreshToken);

    if (userStatus && userStatus === 'true') {
      const refreshTimeCollector = await isTokennExpireHandle();
      typeof refreshTimeCollector === 'number' &&
      refreshTimeCollector !== refreshingTime
        ? setRefreshingTime(refreshTimeCollector)
        : async () => {
            const {refreshToken, userStatus} = await getTokens();
            if (refreshToken && userStatus === 'true')
              accessTokenGenerator(refreshToken);
          };
    } else {
      store.dispatch(logout());
    }
  });

  // Refreshes according to the life expectation of the token
  useTokenRefreshTimer(refreshingTime);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={themes}>
        <Provider store={store}>
          <PaperProvider>
            <RootStack />
          </PaperProvider>
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
