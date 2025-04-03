import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {GetStartedScreen} from '../../Screens/OnBoarding/GetStartedScreen';
import {SignUpScreen} from '../../Screens/OnBoarding/SignUpScreen';
import {SignInScreen} from '../../Screens/OnBoarding/SignInScreen';
import {OtpScreen} from '../../Screens/OnBoarding/OptScreen';
import {ProfileSetupScreen} from '../../Screens/OnBoarding/ProfileSetupScreen';
import {ProfileCreateScreen} from '../../Screens/OnBoarding/ProfileCreateScreen';
import {SplashScreen} from '../../Screens/OnBoarding/SplashScreen';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ColorSpace} from 'react-native-reanimated';

type OnBoardingStackParamList = {
  SplashScreen: undefined;
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
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: fonts.medium.fontFamily,
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
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
              headerTitle: "Let's get Started",
            },
          },
          {
            screenName: 'SignUpScreen',
            component: SignUpScreen,
            option: {
              headerTitle: "Let's get Started",
            },
          },
          {screenName: 'OtpScreen', component: OtpScreen},
          {screenName: 'ProfileSetupScreen', component: ProfileSetupScreen},
          {screenName: 'ProfileCreateScreen', component: ProfileCreateScreen},
        ])}
      </OnBoardingStackBuilder.Navigator>
    </>
  );
};
