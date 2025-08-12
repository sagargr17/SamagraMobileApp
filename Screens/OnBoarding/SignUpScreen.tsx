import React from 'react';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {ScrollableLayout} from '../../Layout/ScreenLayout/ScrollableLayout';
import {SignUpForm} from '../../Components/Organism/OnBoarding/SignUpFormOrganism';
import {SocialForm} from '../../Components/Organism/OnBoarding/SocialFormOrganism';
import {ContinueDividerElement} from '../../Components/Elements/ContinueDividerElement';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import AppButtonElement from '../../Components/Elements/ButtonElement';
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
      <SpacerElement height={size.spacing.s} />
      <ContinueDividerElement />
      <SpacerElement height={size.spacing.l} />
      <AppButtonElement mode="outlined" onPress={goLogin} style={{}}>
        Continue with Username
      </AppButtonElement>
      <SpacerElement height={size.spacing.l} />
      <SocialForm
        onAppleClick={() => navigation.navigate('ProfileSetupScreen')}
      />
    </ScrollableLayout>
  );
};
