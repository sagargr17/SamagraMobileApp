import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {BottomTabNavigator} from './BottomTab/BottomTabNavigator';
import {OnBoardingStackNavigator} from './Stack/OnBoardingStackNavigator';
import {SplashScreen} from '../Screens/OnBoarding/SplashScreen';
import {Tuple} from '@reduxjs/toolkit';
import {ApplicationOverlayStackNavigator} from './Stack/ApplicationOverlayStackNavigator';

type RootStackParamList = {
  ApplicationOverlay: undefined;
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
      component={item.component}
    />
  ));
};

export const RootStack: React.FC = () => {
  const userSignInStatus = useSelector(
    (state: any) => state.user.isAuthenticated,
  );

  // console.log('RootSTackScreen::::', userSignInStatus);

  return (
    <>
      <RootStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {userSignInStatus === true
          ? screenBuilder([
              {screenName: 'BottomTab', component: BottomTabNavigator},
              {
                screenName: 'ApplicationOverlay',
                component: ApplicationOverlayStackNavigator,
              },
            ])
          : screenBuilder([
              {screenName: 'OnBoarding', component: OnBoardingStackNavigator},
            ])}
      </RootStackBuilder.Navigator>
    </>
  );
};
