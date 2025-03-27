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
        'Exercitation consequat qui labore officia sit. qui labore officia sit.',
      buttonText: 'Get Started',
    },
    {
      id: 2,
      title: 'Samagra',
      content:
        'Minim et nisi aliqua ad ut sit consequat. qui labore officia sit.',
      buttonText: 'Done',
    },
  ];

  const onCompleted = () => {
    navigation.navigate('SignUpScreen');
  };

  return <GetStarted options={options} onDone={onCompleted} />;
};
