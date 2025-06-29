import {
  ApolloClient,
  ApolloProvider,
  concat,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';
import {NavigationContainer} from '@react-navigation/native';
import {createClient} from 'graphql-ws';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider, ProgressBar} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {accessTokenGenerator} from './client/Token/AccessTokenGenerator';
import {getTokens} from './client/Token/TokenAccess';
import {isTokenExpired} from './client/Token/TokeValidator';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';
import {login, logout} from './StateManagement/User/UserSlice';
import {setError} from './StateManagement/Error&loadingHandle/ErrorHandlingSlice';

// ErrorResponse
const errorLink = onError(({graphQLErrors, networkError, protocolErrors}) => {
  console.log('calling function');

  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
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
    console.log(`[Network error]: ${networkError}`);
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
    console.log('1');

    if (userStatus === 'true' && refreshToken) {
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
    store.dispatch(
      login({
        isAuthenticated: true,
      }),
    );
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
    address = `${address}?token=mytokenn`;
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
          getPublicItems: {
            merge(existing = {nodes: [], pageInfo: {}}, incoming, {args}) {
              console.log('Incoming', incoming);

              // 'existing' is the data already in the cache for getPublicItems
              // 'incoming' is the new data received from the fetchMore call
              // 'args' are the arguments used in the current query (e.g., { after: "someCursor" })

              // Ensure incoming data is valid
              if (!incoming || !incoming.nodes) {
                return existing; // Don't try to merge invalid incoming data
              }

              let mergedNodes = existing.nodes || [];

              // If 'after' argument is present, it means we are fetching subsequent pages
              // We should append the new nodes to the existing ones
              if (args && args.after) {
                mergedNodes = [...mergedNodes, ...incoming.nodes];
              } else {
                // If 'after' is NOT present, it's likely the initial fetch
                // or a refetch from the beginning. In this case, we replace.
                mergedNodes = incoming.nodes;
              }

              return {
                ...incoming, // Take all other properties from the incoming data (like __typename)
                nodes: mergedNodes, // Use our merged nodes array
                pageInfo: incoming.pageInfo, // Always take the latest pageInfo
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

// Main Modules
function App(): React.JSX.Element {
  BootSplash.hide({fade: true});
  const [themes] = useState(MyTheme); // Default to light theme
  const barStyle =
    themes.colors.background === 'rgb(255, 255, 255)'
      ? 'dark-content'
      : 'light-content';

  return (
    <>
      <FlashMessage position="top" floating={true} />

      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <Provider store={store}>
          <StatusBar
            backgroundColor={themes.colors.background}
            barStyle={barStyle}></StatusBar>
          <NavigationContainer theme={themes}>
            <ApolloProvider client={client}>
              <PaperProvider>
                <SafeAreaProvider>
                  <RootStack />
                </SafeAreaProvider>
              </PaperProvider>
            </ApolloProvider>
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
