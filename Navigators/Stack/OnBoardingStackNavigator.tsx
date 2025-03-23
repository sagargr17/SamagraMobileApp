import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {GetStartedScreen} from '../../Screens/OnBoarding/GetStartedScreen';
import {SignUpScreen} from '../../Screens/OnBoarding/SignUpScreen';
import {SignInScreen} from '../../Screens/OnBoarding/SignInScreen';

type OnBoardingStackParamList = {
  GetStartedScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
};

// Its The builder with the
export const OnBoardingStackBuilder =
  createNativeStackNavigator<OnBoardingStackParamList>();

export type OnBoardingStackNavigationProp<
  T extends keyof OnBoardingStackParamList,
> = NativeStackNavigationProp<OnBoardingStackParamList, T>;

export interface OnBoardingStackProps<
  T extends keyof OnBoardingStackParamList,
> {
  navigation: OnBoardingStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{screenName: keyof OnBoardingStackParamList; component: any}>,
) => {
  return data.map(item => (
    <OnBoardingStackBuilder.Screen
      key={item.screenName}
      navigationKey="OnBoardingKey"
      name={item.screenName}
      component={item.component}
    />
  ));
};

export const OnBoardingStackNavigator: React.FC = () => {
  return (
    <>
      <OnBoardingStackBuilder.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {screenBuilder([
          {screenName: 'GetStartedScreen', component: GetStartedScreen},
          {screenName: 'SignUpScreen', component: SignUpScreen},
          {screenName: 'SignInScreen', component: SignInScreen},
        ])}
      </OnBoardingStackBuilder.Navigator>
    </>
  );
};
