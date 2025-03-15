import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {AppRegistry} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {StringValueNode} from 'graphql';
import {Provider} from 'react-redux';
import {store} from './StateManagement/Store';
import {LoginScreen} from './Screens/User/LoginScreen';
import {RootStack} from './Navigation/Stack/RootStack';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://202.51.83.43/graphql',
  cache: new InMemoryCache(),
});

// Main Modules
function App(): React.JSX.Element {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<String>();
  const userStatus = true;

  return (
    // <Text>Hello World</Text>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'black',
  },
});

export default App;
