import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from '../../Screens/User/LoginScreen';

type RootStackParamList = {
  LoginForm: undefined;
  home: undefined;
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
  console.log("LOGGGG")
  return (
    <>
      <RootStackBuilder.Navigator>
        {screenBuilder([{screenName: 'LoginForm', component: LoginScreen}])}
      </RootStackBuilder.Navigator>
    </>
  );
};
