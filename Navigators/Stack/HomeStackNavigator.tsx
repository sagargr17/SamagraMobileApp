import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {TestScreen} from '../../Screens/Application/User/TestScreen';
import {HomeDetailScreen} from '../../Screens/Application/Home/HomeDetailScreen';
import {HomeScreen} from '../../Screens/Application/Home/HomeScreen';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {HomeLandingScreen} from '../../Screens/Application/Home/HomeLandingScreen';

type HomeStackParamList = {
  HomeLandingScreen: undefined;
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
          header: () => null,
        }}>
        {screenBuilder([
          {screenName: 'HomeScreen', component: HomeScreen},
          {screenName: 'HomeLandingScreen', component: HomeLandingScreen},
          {screenName: 'HomeDetailScreen', component: HomeDetailScreen},
        ])}
      </HomeStackBuilder.Navigator>
    </>
  );
};
