import {
  ApolloClient,
  ApolloProvider,
  concat,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {fetch as netInfoFetch} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AppState, StatusBar, useColorScheme} from 'react-native';
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
import {SingnlePageError} from './Components/Layout/SinglePageError';
import {
  GRAPHQL_ENDPOINT,
  SUBS_ENDPOINT,
} from './Constants/SamagraConstants/SamagraEndpoints';
import {useTokenRefreshTimer} from './CustomHooks/useTokenRefreshTimer';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyDarkTheme, MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';
import {login, logout} from './StateManagement/User/UserSlice';
import {AreaMapper} from './Utilities/CustomMethods';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {getMainDefinition} from '@apollo/client/utilities';

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

const wsLink = new GraphQLWsLink(
  createClient({
    url: SUBS_ENDPOINT,
    connectionParams: async () => {
      const {accessToken} = await getTokens();
      return {
        authToken: accessToken,
      };
    },
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
  wsLink, // Use WebSocketLink for subscriptions
  httpAuthLink, // Use the chained HttpLink (with auth) for queries and mutations
);

// Initialize Apollo Client
const client = new ApolloClient({
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
          color: themes.colors.text,
          lineHeight: AreaMapper({
            value: 100,
            scaleBy: 'average',
          }),
          fontWeight: 'regular',
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
            <></>
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
                  <RootStack />
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
