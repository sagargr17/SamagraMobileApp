import React from 'react';
import LoginForm from '../../Components/Layout/LoginForm';
import {RootStackNavigationProp} from '../../Navigation/Stack/RootStack';
import {SamagraAlert} from '../../Components/Sections/SamagraAlert';

interface LoginScreenProps {
  navigation: RootStackNavigationProp<'LoginForm'>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  console.log('sagar hero cha');

  return (
    <>
      <LoginForm></LoginForm>
      {/* <SamagraAlert title="Title1" description="allabour"></SamagraAlert> */}
    </>
  );
};
