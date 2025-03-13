import React from 'react';
import LoginForm from '../../Components/Layout/LoginForm';
import {RootStackNavigationProp} from '../../Navigation/Stack/RootStack';

interface LoginScreenProps {
  navigation: RootStackNavigationProp<'LoginForm'>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  console.log('NAvigation');

  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
};
