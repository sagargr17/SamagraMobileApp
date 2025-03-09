import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {AppRegistry} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://202.51.83.43/graphql',
  cache: new InMemoryCache(),
});

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Text
          style={{
            backgroundColor: 'orange',
          }}>
          Hellow World
        </Text>
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
