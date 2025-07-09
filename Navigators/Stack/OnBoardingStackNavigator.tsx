import { useTheme } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { size } from '../../Prefrences/Prefrences';
import { GetStartedScreen } from '../../Screens/OnBoarding/GetStartedScreen';
import { OtpScreen } from '../../Screens/OnBoarding/OptScreen';
import { ProfileCreateScreen } from '../../Screens/OnBoarding/ProfileCreateScreen';
import { ProfileSetupScreen } from '../../Screens/OnBoarding/ProfileSetupScreen';
import { SignInScreen } from '../../Screens/OnBoarding/SignInScreen';
import { SignUpScreen } from '../../Screens/OnBoarding/SignUpScreen';
import { SplashScreen } from '../../Screens/OnBoarding/SplashScreen';

type OnBoardingStackParamList = {
  SplashScreen: undefined;
  GetStartedScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  OtpScreen: {
    username: string;
  };
  ProfileSetupScreen: undefined;
  ProfileCreateScreen: undefined;
};

// It is the builder that create Nanvigation
export const OnBoardingStackBuilder =
  createNativeStackNavigator<OnBoardingStackParamList>();

//
export type OnBoardingStackNavigationProp<
  T extends keyof OnBoardingStackParamList,
> = NativeStackNavigationProp<OnBoardingStackParamList, T>;

export interface OnBoardingStackProps<
  T extends keyof OnBoardingStackParamList,
> {
  navigation: OnBoardingStackNavigationProp<T>;
}

const screenBuilder = (
  data: Array<{
    screenName: keyof OnBoardingStackParamList;
    component: any;
    option?: NativeStackNavigationOptions;
  }>,
) => {
  return data.map(item => (
    <OnBoardingStackBuilder.Screen
      options={item.option}
      key={item.screenName}
      navigationKey="OnBoardingKey"
      name={item.screenName}
      component={item.component}
    />
  ));
};

export const OnBoardingStackNavigator: React.FC = () => {
  const {fonts, colors} = useTheme();
  return (
    <>
      <OnBoardingStackBuilder.Navigator
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: size.textVariants.title.fontSize,
            fontFamily: fonts.regular.fontFamily,
            fontWeight: fonts.regular.fontWeight,
          },
          headerShadowVisible: false,
        }}>
        {screenBuilder([
          {
            screenName: 'SplashScreen',
            component: SplashScreen,
            option: {
              header: () => null,
            },
          },
          {
            screenName: 'GetStartedScreen',
            component: GetStartedScreen,
            option: {
              header: () => null,
            },
          },
          {
            screenName: 'SignInScreen',
            component: SignInScreen,
            option: {
              headerTitle: 'Login With Username',
            },
          },
          {
            screenName: 'SignUpScreen',
            component: SignUpScreen,
            option: {
              headerTitle: 'Recover Your Account',
            },
          },
          {screenName: 'OtpScreen', component: OtpScreen},
          {screenName: 'ProfileSetupScreen', component: ProfileSetupScreen},
          {
            screenName: 'ProfileCreateScreen',
            component: ProfileCreateScreen,
            option: {
              headerTitle: 'Build Your Profile',
            },
          },
        ])}
      </OnBoardingStackBuilder.Navigator>
    </>
  );
};
