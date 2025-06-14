import React from 'react';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {ScrollableLayout} from '../../Layout/ScreenLayout/ScrollableLayout';
import {SignUpForm} from '../../Components/Organism/SignUpForm';
import {SocialForm} from '../../Components/Organism/SocialForm';
import {ContinueDivider} from '../../Components/Elements/ContinueDivider';
import {Spacer} from '../../Components/Elements/Spacer';
import AppButton from '../../Components/Elements/Button';
import {size} from '../../Prefrences/Prefrences';

interface OnBoardingScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

export const SignUpScreen: React.FC<OnBoardingScreenProps> = ({navigation}) => {
  const goLogin = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <ScrollableLayout>
      <SignUpForm />
      <Spacer height={size.spacing.s} />
      <ContinueDivider />
      <Spacer height={size.spacing.l} />
      <AppButton mode="outlined" onPress={goLogin} style={{}}>
        Continue with Username
      </AppButton>
      <Spacer height={size.spacing.l} />
      <SocialForm
        onAppleClick={() => navigation.navigate('ProfileSetupScreen')}
      />
    </ScrollableLayout>
  );
};
