import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from '../Screens/Application/User/LoginScreen';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type RootStackParamList = {
  LoginForm: undefined;
  BottomTab: undefined;
  OnBoarding: undefined;
};

// Its The builder with the
export const RootStackBuilder =
  createNativeStackNavigator<RootStackParamList>();

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export interface RootStackProps<T extends keyof RootStackParamList> {
  navigation: RootStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{screenName: keyof RootStackParamList; component: any}>,
) => {
  return data.map(item => (
    <RootStackBuilder.Screen
      key={item.screenName}
      navigationKey="LoginFormKey"
      name={item.screenName}
      component={item.component}></RootStackBuilder.Screen>
  ));
};

export const RootStack: React.FC = () => {
  return (
    <>
      <RootStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {screenBuilder([
          // {screenName: 'LoginForm', component: LoginScreen},
          {screenName: 'OnBoarding', component: OnBoardingStackNavigator},
          {screenName: 'BottomTab', component: BottomTabNavigator},
          {screenName: 'LoginForm', component: LoginScreen},
        ])}
      </RootStackBuilder.Navigator>
    </>
  );
};
