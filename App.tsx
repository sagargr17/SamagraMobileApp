import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {getTokens} from './Client/Token/TokenAccess';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraEndpoints';
import {RootStack} from './Navigators/RootStackNavigator';
import {MyDarkTheme, MyTheme} from './Prefrences/Prefrences';
import {store} from './StateManagement/Store';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// Main Modules
function App(): React.JSX.Element {
  const [userName, setUserName] = useState<string>();
  const scheme = useColorScheme(); // Get the current color scheme
  const [themes, setTheme] = useState(MyTheme); // Default to light theme

  useEffect(() => {
    if (scheme === 'dark') {
      setTheme(MyDarkTheme);
    } else {
      setTheme(MyTheme);
    }
  }, [scheme]);

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
