import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import AppButton from '../../Components/elements/Button';
import {Spacer} from '../../Components/elements/Spacer';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import {SignUpForm} from '../../Components/Sections/SignUp/SignUpForm';
import {SocialForm} from '../../Components/Sections/SocialForm';
import { ContinueDivider } from '../../Components/Sections/ContinueDivider';

interface OnBoardingScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

export const SignUpScreen: React.FC<OnBoardingScreenProps> = ({navigation}) => {
  const goLogin = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <OnBoardingLayout header={"Let's get Started!"}>
      <SignUpForm />
      <Spacer />
      <ContinueDivider />
      <Spacer />
      <AppButton mode="outlined" onPress={goLogin}>
        Continue with Email
      </AppButton>
      <Spacer />
      <SocialForm />
    </OnBoardingLayout>
  );
};
