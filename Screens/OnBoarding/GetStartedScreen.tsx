import React from 'react';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import GetStarted from '../../Components/Layout/GetStarted';

interface OnBoardingScreenProps {
  navigation: OnBoardingStackNavigationProp<'GetStartedScreen'>;
}

export const GetStartedScreen: React.FC<OnBoardingScreenProps> = ({
  navigation,
}) => {
  const options = [
    {
      id: 1,
      title: 'Samagra',
      content:
        'Get trusted services from cleaning to repairs, anytime, anywhere.',
      buttonText: 'Get Started',
    },
    {
      id: 2,
      title: 'Samagra',
      content:
        'Get trusted products, from essentials to exclusives, anytime, anywhere.',
      buttonText: 'Done',
    },
  ];

  const onCompleted = () => {
    navigation.navigate('SignUpScreen');
  };

  return <GetStarted options={options} onDone={onCompleted} />;
};
