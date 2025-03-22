import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {AppState, useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {getTokens} from './Client/Token/TokenAccess';
import {
  isTokenExpired,
  startTokenRefreshTimer,
} from './Client/Token/TokeValidator';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyDarkTheme, MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';
import {accessTokenGenerator} from './Client/Token/AccessTokenGenerator';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// MAin Fuction To Token Refresh Handle
const isTokennExpireHandle = async () => {
  const isTokenExpiredStatus = await isTokenExpired();
  console.log('Toke Status', isTokenExpiredStatus);
  return isTokenExpiredStatus;
};

// Main Modules
function App(): React.JSX.Element {
  const scheme = useColorScheme(); // Get the current color scheme
  const [themes, setTheme] = useState(MyTheme); // Default to light theme
  const [refreshingTime, setRefreshingTime] = useState<number>(3600);

  //This is the useEffect Function for changing the dark and bright mode
  useEffect(() => {
    if (scheme === 'dark') {
      setTheme(MyDarkTheme);
    } else {
      setTheme(MyTheme);
    }
  }, [scheme]);

  //This is the code for the refresh token , when the app is coming from , background to foreground
  AppState.addEventListener('focus', async () => {
    const refreshTimeCollector = await isTokennExpireHandle();
    typeof refreshTimeCollector === 'number' &&
    refreshTimeCollector !== refreshingTime
      ? setRefreshingTime(refreshTimeCollector)
      : async () => {
          const {refreshToken} = await getTokens();
          if (refreshToken) accessTokenGenerator(refreshToken);
        };
  });

  // Refreshes according to the life expectation of the token
  useMemo(() => {
    startTokenRefreshTimer(refreshingTime);
  }, [refreshingTime]);

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
