import React from 'react';
import {Controller, Form, useForm} from 'react-hook-form';
import PhoneInputElement from '../../Elements/PhoneInputElement';
import AppButtonElement from '../../Elements/ButtonElement';
import {SpacerElement} from '../../Elements/SpacerElement';
import {ErrorTextElement} from '../../Elements/ErrorTextElement';
import {Button} from 'react-native';
import {userRules} from '../../../Constants/UI/Rules';
import {useNavigation} from '@react-navigation/native';
import {OnBoardingStackNavigationProp} from '../../../Navigators/Stack/OnBoardingStackNavigator';
import {size} from '../../../Prefrences/Prefrences';

interface SignUpData {
  phone: string;
}

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpData>();
  const navigation =
    useNavigation<OnBoardingStackNavigationProp<'ProfileCreateScreen'>>();
  const onButtonPress = (data: SignUpData) => {
    navigation.navigate('ProfileCreateScreen');
  };

  return (
    <>
      <SpacerElement height={size.spacing.xs} />
      <Controller
        control={control}
        name="phone"
        rules={userRules.phoneRules}
        render={({field: {onChange, value}}) => (
          <>
            <PhoneInputElement
              label="Enter your Phone Number"
              value={value}
              onChangeText={onChange}
              error={!!errors.phone}
            />
          </>
        )}
      />
      {errors.phone && <ErrorTextElement>{errors.phone?.message}</ErrorTextElement>}
      <SpacerElement height={size.spacing.m} />

      <AppButtonElement color="primary" onPress={handleSubmit(onButtonPress)}>
        Continue
      </AppButtonElement>
      <SpacerElement height={size.spacing.xs} />
    </>
  );
};
