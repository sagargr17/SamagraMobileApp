import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {GetStartedScreen} from '../../Screens/OnBoarding/GetStartedScreen';
import {SignUpScreen} from '../../Screens/OnBoarding/SignUpScreen';
import {SignInScreen} from '../../Screens/OnBoarding/SignInScreen';
import {OtpScreen} from '../../Screens/OnBoarding/OptScreen';
import {ProfileSetupScreen} from '../../Screens/OnBoarding/ProfileSetupScreen';
import {ProfileCreateScreen} from '../../Screens/OnBoarding/ProfileCreateScreen';

type OnBoardingStackParamList = {
  GetStartedScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  OtpScreen: undefined;
  ProfileSetupScreen: undefined;
  ProfileCreateScreen: undefined;
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
          headerTitle: '',
          headerTransparent: true,
          headerBackButtonDisplayMode: 'minimal',
        }}>
        {screenBuilder([
          {screenName: 'GetStartedScreen', component: GetStartedScreen},
          {screenName: 'SignInScreen', component: SignInScreen},
          {screenName: 'SignUpScreen', component: SignUpScreen},
          {screenName: 'OtpScreen', component: OtpScreen},
          {screenName: 'ProfileSetupScreen', component: ProfileSetupScreen},
          {screenName: 'ProfileCreateScreen', component: ProfileCreateScreen},
        ])}
      </OnBoardingStackBuilder.Navigator>
    </>
  );
};
