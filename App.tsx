import {
  ApolloClient,
  ApolloProvider,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {fetch as netInfoFetch} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AppState, Button, StatusBar, useColorScheme} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Camera} from 'react-native-vision-camera';
import {Provider} from 'react-redux';
import {Logos} from './Assets/SVG/Exports/Exports';
import {accessTokenGenerator} from './client/Token/AccessTokenGenerator';
import {getTokens} from './client/Token/TokenAccess';
import {isTokenExpired} from './client/Token/TokeValidator';
import {SamagraLoader} from './Components/Sections/ErrorHandling/SamagraLoader';
import {SingnlePageError} from './Components/Sections/ErrorHandling/SinglePageError';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';
import {useTokenRefreshTimer} from './CustomHooks/useTokenRefreshTimer';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyDarkTheme, MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';
import {login, logout} from './StateManagement/User/UserSlice';
import {SamagraScaller} from './Utilities/CustomMethods';

// MAin Fuction To Token Refresh Handle
const isTokennExpireHandle = async () => {
  const isTokenExpiredStatus = await isTokenExpired();

  return isTokenExpiredStatus;
};

// creating HTTP Link
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// 2. Create an auth link
const authLink = setContext(async (_, {headers}) => {
  // Get the authentication token from local storage (or wherever you store it)
  const {userStatus, accessToken, refreshToken} = await getTokens();
  console.log('Tokennn', accessToken);

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  // link: httpLink,
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

// Main Modules
function App(): React.JSX.Element {
  // const [refreshingTime, setRefreshingTime] = useState<number>(1800000); // This is the time of refreshing in the second set Default to 1000
  const [refreshingTime, setRefreshingTime] = useState<number>(1000); // This is the time of refreshing in the second set Default to 1000
  let timeBasedRefreshing = useTokenRefreshTimer(refreshingTime);
  const scheme = useColorScheme(); // Get the current color scheme
  const [themes, setTheme] = useState(MyTheme); // Default to light theme
  const [internetStatus, setInternetStatus] = useState<{
    loading: boolean;
    status: boolean;
  }>({
    loading: true,
    status: true,
  }); //Active == true | No Internet  ==
  const [serverError, setServerError] = useState<boolean>(false); //Active == true | No Internet  ==
  const {InternetUnAvailable, ServerDown} = Logos;

  // Refreshing Time checker
  // It Checks Weather the client SErver is Working Fine or not
  useEffect(() => {
    netInfoFetch().then(state => {
      if (state.isConnected) {
        setInternetStatus({
          loading: false,
          status: state.isConnected,
        });
        if (timeBasedRefreshing === 400 && !serverError) {
          setServerError(true);
        } else {
          setServerError(false);

          if (scheme === 'dark') {
            setTheme(MyDarkTheme);
          } else {
            setTheme(MyTheme);
          }
        }
      } else {
        setInternetStatus({
          loading: false,
          status: false,
        });
      }
    });

    const hide = () => {
      BootSplash.hide({fade: true});
    };

    return hide();
  }, [refreshingTime, internetStatus, scheme]);

  //This is the useEffect Function for changing the dark and bright mode
  // useEffect(() => {
  //   if (scheme === 'dark') {
  //     setTheme(MyDarkTheme);
  //   } else {
  //     setTheme(MyTheme);
  //   }
  // }, [scheme]);

  // Code To mnake User Login
  useEffect(() => {
    const getUserStatusHandle = async () => {
      const {userStatus, accessToken, refreshToken} = await getTokens();
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

    console.log('<<<TOKEN', accessToken, refreshingTime);

    if (userStatus && userStatus === 'true') {
      const refreshTimeCollector = await isTokennExpireHandle();
      console.log('?>>>>', refreshTimeCollector);

      typeof refreshTimeCollector === 'number' &&
      refreshTimeCollector !== refreshingTime
        ? setRefreshingTime(refreshTimeCollector * 1000)
        : async () => {
            const {refreshToken, userStatus} = await getTokens();
            if (refreshToken && userStatus === 'true') {
              let refreshingToken = await accessTokenGenerator(refreshToken);
              console.log('refreshing Token', refreshingToken);
            }
          };
    } else {
      store.dispatch(logout());
    }
  });

  // This is for the image upload to get the Permission from User
  useEffect(() => {
    Camera.requestCameraPermission().then(permission => {
      if (permission !== 'granted') {
        console.warn('Camera permission not granted!');
      }
    });
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      {/* <Button
        title="Token"
        onPress={() => console.log('>>>', refreshingTime)}></Button> */}
      <Provider store={store}>
        <StatusBar
          backgroundColor={themes.colors.background}
          barStyle={
            themes.colors.background === 'rgb(255, 255, 255)'
              ? 'dark-content'
              : 'light-content'
          }></StatusBar>
        <NavigationContainer theme={themes}>
          {internetStatus.loading === true ? (
            <SamagraLoader></SamagraLoader>
          ) : internetStatus.status === true ? (
            serverError ? ( // change this to serverError while in production
              <SingnlePageError
                detail={{
                  icon: (
                    <ServerDown
                      height={SamagraScaller({
                        value: 250,
                        scaleBy: 'average',
                      })}
                      width="80%"></ServerDown>
                  ),
                  title:
                    "We're sorry, the server is down for maintenance. We'll be back online soon.",
                  onButtonPress: () => setServerError(!serverError),
                  buttonTitle: 'Try Again',
                }}></SingnlePageError>
            ) : (
              <ApolloProvider client={client}>
                <PaperProvider>
                  <RootStack />
                </PaperProvider>
              </ApolloProvider>
            )
          ) : (
            <SingnlePageError
              detail={{
                icon: (
                  <InternetUnAvailable
                    height={SamagraScaller({
                      value: 250,
                      scaleBy: 'average',
                    })}
                    width="80%"></InternetUnAvailable>
                ),
                title: 'Please Check Your Internet and Try again !',
                onButtonPress: () => setServerError(!serverError),
                buttonTitle: 'Try Again',
              }}></SingnlePageError>
          )}
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
