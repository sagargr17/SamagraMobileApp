import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {AppState, useColorScheme, Image} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {getTokens} from './Client/Token/TokenAccess';
import {isTokenExpired} from './Client/Token/TokeValidator';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyDarkTheme, MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';
import {accessTokenGenerator} from './Client/Token/AccessTokenGenerator';
import {useTokenRefreshTimer} from './CustomHooks/useTokenRefreshTimer';
import {Logos} from './Assets/SVG/Exports/Exports';

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
  const [refreshingTime, setRefreshingTime] = useState<number>(1000); // This is the time of refreshing in the second

  const {AppleLogo, Mac} = Logos;

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
    refreshTimeCollector !== refreshingTime &&
    refreshTimeCollector < 1000
      ? setRefreshingTime(refreshTimeCollector)
      : async () => {
          const {refreshToken, userStatus} = await getTokens();
          if (refreshToken && userStatus === 'true')
            accessTokenGenerator(refreshToken);
        };
  });

  // Refreshes according to the life expectation of the token
  useTokenRefreshTimer(refreshingTime);

  return (
    <>
      <AppleLogo with={400} height={400}></AppleLogo>
      <Mac with={400} height={400}></Mac>
    </>
    // <ApolloProvider client={client}>
    //   <NavigationContainer theme={themes}>
    //     <Provider store={store}>
    //       <PaperProvider>
    //         <RootStack />
    //       </PaperProvider>
    //     </Provider>
    //   </NavigationContainer>
    // </ApolloProvider>
  );
}

export default App;
