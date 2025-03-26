import React from 'react';
import {Button, Text} from 'react-native-paper';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
import {ScrollView} from 'react-native';
import {clearTokens} from '../../../Client/Token/TokenAccess';
import {client} from '../../../Client/Graphql/PublicClient';
import {getPublicItems} from '../../../GraphQL/Queries/ItemQueries';

interface HomeScreenProps {
  navigation: HomeStackNavigationProp<'HomeScreen'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // Testing Function , will be handle sepratedly for efficiendy in future
  const handleGoToHomeDetailScreen = () => {
    navigation.navigate('HomeDetailScreen');
  };

  const getPublicData = async () => {
    const result = await client.query({
      query: getPublicItems,
    });

    console.log('Data Resultttt....', result);
  };

  return (
    <>
      <ScrollView
        style={{
          marginTop: 100,
        }}>
        <Text>Home Screen</Text>
        <Button
          style={{
            marginBottom: 50,
          }}
          icon="camera"
          mode="contained"
          onPress={handleGoToHomeDetailScreen}>
          Go to HomeDetail Screen
        </Button>
        <Button icon="camera" mode="contained" onPress={clearTokens}>
          Logout
        </Button>
        <Button
          icon="camera"
          mode="contained"
          onPress={getPublicData}
          style={{
            marginTop: 50,
          }}>
          Public Data
        </Button>
      </ScrollView>
    </>
  );
};
