import React from 'react';
import {Button, Text} from 'react-native-paper';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
import {ScrollView} from 'react-native';
import {clearTokens} from '../../../Client/Token/TokenAccess';

interface HomeScreenProps {
  navigation: HomeStackNavigationProp<'HomeScreen'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // Testing Function , will be handle sepratedly for efficiendy in future
  const handleGoToHomeDetailScreen = () => {
    navigation.navigate('HomeDetailScreen');
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
            marginBottom: 200,
          }}
          icon="camera"
          mode="contained"
          onPress={handleGoToHomeDetailScreen}>
          Go to HomeDetail Screen
        </Button>
        <Button icon="camera" mode="contained" onPress={clearTokens}>
          Logout
        </Button>
      </ScrollView>
    </>
  );
};
