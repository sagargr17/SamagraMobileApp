import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';
import { getApp } from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createClient } from 'graphql-ws';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { accessTokenGenerator } from './client/Token/AccessTokenGenerator';
import { getTokens } from './client/Token/TokenAccess';
import { isTokenExpired } from './client/Token/TokeValidator';
import { GRAPHQL_ENDPOINT } from './Constants/SamagraConstants/SamagraEndpoints';
import { RootStack } from './Navigators/RootStackNavigator';
import { MyTheme, responseTheme } from './Prefrences/Prefrences';
import { setError } from './StateManagement/Error&loadingHandle/ErrorHandlingSlice';
import { store } from './StateManagement/Store';
import { login, logout } from './StateManagement/User/UserSlice';

// BootSplash
BootSplash.hide();

// ErrorResponse
const errorLink = onError(({graphQLErrors, networkError, protocolErrors}) => {
  console.log('calling function');

  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      showMessage(
        responseTheme(message, 'Verify & Try again later ! ', 'danger'),
      ),
    );

  if (protocolErrors) {
    protocolErrors.forEach(({message, extensions}) => {
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions,
        )}`,
      );
    });
  }

  if (networkError) {
    store.dispatch(
      setError({
        error: {
          isErorr: true,
          type: 'networkError',
          message: `${networkError.message}`,
        },
      }),
    );
  }
});

// creating HTTP Link
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// 2. Create an auth link
const authLink = setContext(async (_, {headers}) => {
  // Get the authentication token from local storage (or wherever you store it)
  const isTokenExpiredVar = await isTokenExpired();
  const {userStatus, refreshToken} = await getTokens();

  // Token
  if (isTokenExpiredVar === true) {
    if (typeof userStatus === 'string' && 'true' && refreshToken) {
      console.log('2');
      console.log('auth Link');

      const newAccessToken = await accessTokenGenerator(refreshToken);
      if (newAccessToken === 400) {
        store.dispatch(logout());
        return null;
      }
    }

    store.dispatch(logout());

    return {
      headers: {
        ...headers,
        authorization: '',
      },
    };
  } else {
    console.log('2');
    const {accessToken} = await getTokens();
    console.log('Token...', accessToken);

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  }
});

// Links
const httpAuthLink = errorLink.concat(authLink.concat(httpLink));

class MyWebSocket extends WebSocket {
  constructor(address: any, protocols: any) {
    address = `${address}?token=eyJhbGciOiJSUzI1NiIsImtpZCI6Im15LWhhcmRjb2RlZC1rZXktaWQiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwOi8vaWRlbnRpdHkuc2FtYWdyYW5lcGFsLmNvbSIsIm5iZiI6MTc1MTM3MjA3NiwiaWF0IjoxNzUxMzcyMDc2LCJleHAiOjE3NTM5NjQwNzYsImF1ZCI6Im1hcmtldHBsYWNlIiwic2NvcGUiOlsibWFya2V0cGxhY2UuYWNjZXNzIiwib3BlbmlkIiwicHJvZmlsZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJjdXN0b20iXSwiY2xpZW50X2lkIjoiI3NnYXJhcCoiLCJzdWIiOiI0ZTFlNzcyOC1kZWZhLTQxOTEtOGZkOS03MGRkNmZkMmNhZmMiLCJhdXRoX3RpbWUiOjE3NTEzNzIwNzYsImlkcCI6ImxvY2FsIiwibmFtZSI6InNhZ2FyICIsInByZWZlcnJlZF91c2VybmFtZSI6InNhZ2FyIiwianRpIjoiNkE5QjhDRDY1RDhGM0IyODhDMjQyNThFOTE0NzMwNkIifQ.KIYvROC83CvrLm0u3v-zUNCtIi1Y8-cmWald6qOC3aV--AQQLhLIg5sHoMlPL8yaXbZjeWzQjfLXG83RJeZLEwab86btL1q_Xgxh2CfkqTuRz03Px1tZfkljNi0bBKCd8dqDGOjgjDUINRk5taqs9KbcF4hFASxSm191T9WiSpg`;
    super(address, protocols);
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
  httpAuthLink,
);

// Initialize Apollo Client
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPublicItems: relayStylePagination(),
          getItems: relayStylePagination(),
          getShops: relayStylePagination(),
          getOrders: relayStylePagination(),
          getBasketItems: relayStylePagination(),
        },
      },
    },
  }),
});

const permissionReqeust = async () => {
  let responde = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (responde === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Grandted');
  } else {
    console.log('SDK APi is Less than 13 ');
  }
};

// OnnBootStrap
async function onAppBootstrap() {
  // Register the device with FCM
  await getApp()
    .messaging()
    .registerDeviceForRemoteMessages()
    .then(result => console.log('Result...', result))
    .catch(err => console.log('Erorr', err));

  // Get the token
  const token = await getApp().messaging().getToken();
  // getApp()
  //   .messaging()
  //   .onMessage(() => console.log('Home Ground'));
  // getApp()
  //   .messaging()
  //   .setBackgroundMessageHandler(() => console.log('Background'));
}

// Main Modules
function App(): React.JSX.Element {
  const [themes] = useState(MyTheme); // Default to light theme
  const barStyle =
    themes.colors.background === 'rgb(255, 255, 255)'
      ? 'dark-content'
      : 'light-content';

  const userStatus = async () => {
    const {userStatus} = await getTokens();
    return userStatus;
  };

  useEffect(() => {
    permissionReqeust();
    onAppBootstrap();
    // User sTatus
    userStatus()
      .then(res => {
        console.log('Result::', res);

        if (typeof res === 'string' && res === 'true') store.dispatch(login());
        else {
          store.dispatch(logout());
        }
      })
      .catch(err => store.dispatch(logout()));
  }, []);

  return (
    <>
      <FlashMessage position="top" floating={true} />
      <Provider store={store}>
        <StatusBar
          backgroundColor={themes.colors.background}
          barStyle={barStyle}></StatusBar>
        <NavigationContainer theme={themes}>
          <ApolloProvider client={client}>
            <PaperProvider>
              <SafeAreaProvider>
                <GestureHandlerRootView>
                  <RootStack />
                </GestureHandlerRootView>
              </SafeAreaProvider>
            </PaperProvider>
          </ApolloProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
