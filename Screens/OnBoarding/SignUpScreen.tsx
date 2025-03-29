import React from 'react';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import {SignUpForm} from '../../Components/Sections/SignUp/SignUpForm';
import {SocialForm} from '../../Components/Sections/SocialForm';
import {ContinueDivider} from '../../Components/Sections/ContinueDivider';
import {Spacer} from '../../Components/Elements/Spacer';
import AppButton from '../../Components/Elements/Button';

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
      <SocialForm
        onAppleClick={() => navigation.navigate('ProfileSetupScreen')}
      />
    </OnBoardingLayout>
  );
};
