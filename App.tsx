import {
  ApolloClient,
  ApolloProvider,
  concat,
  createHttpLink,
  InMemoryCache,
  split,
  useSubscription,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {getMainDefinition} from '@apollo/client/utilities';
import {fetch as netInfoFetch} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createClient} from 'graphql-ws';
import React, {useEffect, useState} from 'react';
import {AppState, StatusBar, Text, useColorScheme} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Camera} from 'react-native-vision-camera';
import {Provider} from 'react-redux';
import {Logos} from './Assets/SVG/Exports/Exports';
import {accessTokenGenerator} from './client/Token/AccessTokenGenerator';
import {getTokens} from './client/Token/TokenAccess';
import {isTokenExpired} from './client/Token/TokeValidator';
import {SingnlePageError} from './Components/Molecules/SinglePageError';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';
import {useTokenRefreshTimer} from './CustomHooks/useTokenRefreshTimer';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyDarkTheme, MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';
import {login, logout} from './StateManagement/User/UserSlice';
import {AreaMapper} from './Utilities/CustomMethods';
import {getSubscribedData} from './GraphQL/Subscription/Subscription';
import {onDisplayNotification} from './Screens/Application/ReceivedOrdersListScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const httpAuthLink = concat(authLink, httpLink);

class MyWebSocket extends WebSocket {
  constructor(address: any, protocols: any) {
    address = `${address}?token=eyJhbGciOiJSUzI1NiIsImtpZCI6Im15LWhhcmRjb2RlZC1rZXktaWQiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwOi8vaWRlbnRpdHkuc2FtYWdyYW5lcGFsLmNvbSIsIm5iZiI6MTc0ODEwMzY2MCwiaWF0IjoxNzQ4MTAzNjYwLCJleHAiOjE3NTA2OTU2NjAsImF1ZCI6Im1hcmtldHBsYWNlIiwic2NvcGUiOlsibWFya2V0cGxhY2UuYWNjZXNzIiwib3BlbmlkIiwicHJvZmlsZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJjdXN0b20iXSwiY2xpZW50X2lkIjoiI3NnYXJhcCoiLCJzdWIiOiI0ZTFlNzcyOC1kZWZhLTQxOTEtOGZkOS03MGRkNmZkMmNhZmMiLCJhdXRoX3RpbWUiOjE3NDgxMDM2NjAsImlkcCI6ImxvY2FsIiwibmFtZSI6InNhZ2FyICIsInByZWZlcnJlZF91c2VybmFtZSI6InNhZ2FyIiwianRpIjoiMEI2OUVFQTQ3MjVCQTNBNDQ3OUFDQTM0NzMxNjEwQjcifQ.YU-PhEV-mBlZg-EcxCRAy93nwUOKGKwxedJBATw8Buu9XT_SxMCDtkRhbs4tlZnwqBNk9LcfQ7haj-YLNSgOsX267_jqCA0Hg04ipVGaAT_fJb3wVaOLqrct99sW0PsvP6dmvBsD3s_9wlzc-3mwq-M_aCiA_xa_TVfMumqfEu8`;
    super(address, protocols);
    console.log('yyyyyyyyyyyyyy', address);
  }
}

// Craeting WS Link
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://api.samagranepal.com/graphql',
    webSocketImpl: MyWebSocket,
  }),
);
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink, // this is for the sockets
  httpAuthLink, // yo chahi query and mutation jun HTTP flow ma jancha
);

// Initialize Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// Main Modules
function App(): React.JSX.Element {
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
  const font = themes.fonts['regular'];

  // Refreshing Time checker
  // It Checks Weather the client SErver is Working Fine or not
  useEffect(() => {
    netInfoFetch()
      .then(state => {
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
      })
      .then(x => BootSplash.hide({fade: true}))
      .catch(error => console.log('Error::', error));
  }, [refreshingTime, internetStatus, scheme]);

  // UserBased Login
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const getUserStatusHandle = async () => {
      try {
        const {userStatus} = await getTokens();
        userStatus === 'true'
          ? store.dispatch(
              login({
                isAuthenticated: true,
              }),
            )
          : store.dispatch(logout());
      } catch (e) {
        abortController.abort();
      } finally {
      }
    };
    getUserStatusHandle();

    return () => {
      abortController.abort();
    };
  }, []);

  //This is the code for the refresh token , when the app is coming from , background to foreground
  AppState.addEventListener('focus', async () => {
    const {userStatus, accessToken, refreshToken} = await getTokens();

    if (userStatus && userStatus === 'true') {
      const refreshTimeCollector = await isTokennExpireHandle();
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
    return () => {};
  }, []);

  // Create a channel (required for Android)

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <FlashMessage
        position="top"
        textStyle={{
          fontFamily: font.fontFamily,
          fontSize: AreaMapper({
            value: 16,
            scaleBy: 'height',
          }),

          lineHeight: AreaMapper({
            value: 100,
            scaleBy: 'average',
          }),
          fontWeight: 'regular',
          fontStyle: 'italic',
        }}
        floating={true}
      />
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
            <>
              <Text>Loadinggg</Text>
            </>
          ) : internetStatus.status === true ? (
            serverError ? ( // change this to serverError while in production
              <SingnlePageError
                detail={{
                  icon: (
                    <ServerDown
                      height={AreaMapper({
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
                  <SafeAreaProvider>
                    <RootStack />
                  </SafeAreaProvider>
                </PaperProvider>
              </ApolloProvider>
            )
          ) : (
            <SingnlePageError
              detail={{
                icon: (
                  <InternetUnAvailable
                    height={AreaMapper({
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
