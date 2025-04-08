import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {TestScreen} from '../../Screens/Application/User/TestScreen';
import {HomeDetailScreen} from '../../Screens/Application/Home/HomeDetailScreen';
import {HomeScreen} from '../../Screens/Application/Home/HomeScreen';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type HomeStackParamList = {
  HomeScreen: undefined;
  HomeDetailScreen: undefined;
};

// Its The builder with the
export const HomeStackBuilder =
  createNativeStackNavigator<HomeStackParamList>();

export type HomeStackNavigationProp<T extends keyof HomeStackParamList> =
  NativeStackNavigationProp<HomeStackParamList, T>;

export interface HomeStackProps<T extends keyof HomeStackParamList> {
  navigation: HomeStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{screenName: keyof HomeStackParamList; component: any}>,
) => {
  return data.map(item => (
    <HomeStackBuilder.Screen
      key={item.screenName}
      navigationKey={Math.random().toString()}
      name={item.screenName}
      component={item.component}></HomeStackBuilder.Screen>
  ));
};

export const HomeStackNavigator: React.FC = () => {
  return (
    <>
      <HomeStackBuilder.Navigator
        screenOptions={{
          headerTitle: '',
          headerTransparent: true,
          headerBackButtonDisplayMode: 'minimal',
        }}>
        {screenBuilder([
          {screenName: 'HomeScreen', component: HomeScreen},
          {screenName: 'HomeDetailScreen', component: HomeDetailScreen},
        ])}
      </HomeStackBuilder.Navigator>
    </>
  );
};
