import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from '../Screens/Application/User/LoginScreen';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';

type RootStackParamList = {
  LoginForm: undefined;
  BottomTab: undefined;
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
          {screenName: 'BottomTab', component: BottomTabNavigator},
        ])}
      </RootStackBuilder.Navigator>
    </>
  );
};
