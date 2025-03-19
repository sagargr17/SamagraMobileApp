import React from 'react';
import {Button, Text} from 'react-native-paper';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';
import {ScrollView} from 'react-native';

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
      <ScrollView>
        <Text>Home Screen</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={handleGoToHomeDetailScreen}>
          Go to HomeDetail Screen
        </Button>
      </ScrollView>
    </>
  );
};
