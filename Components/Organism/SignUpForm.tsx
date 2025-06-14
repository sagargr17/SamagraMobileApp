import React from 'react';
import {Controller, Form, useForm} from 'react-hook-form';
import PhoneInput from '../Elements/PhoneInput';
import AppButton from '../Elements/Button';
import {Spacer} from '../Elements/Spacer';
import {ErrorText} from '../Elements/ErrorText';
import {Button} from 'react-native';
import {userRules} from '../../Constants/UI/Rules';
import {useNavigation} from '@react-navigation/native';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {size} from '../../Prefrences/Prefrences';

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
      <Spacer height={size.spacing.xs} />
      <Controller
        control={control}
        name="phone"
        rules={userRules.phoneRules}
        render={({field: {onChange, value}}) => (
          <>
            <PhoneInput
              label="Enter your Phone Number"
              value={value}
              onChangeText={onChange}
              error={!!errors.phone}
            />
          </>
        )}
      />
      {errors.phone && <ErrorText>{errors.phone?.message}</ErrorText>}
      <Spacer height={size.spacing.m} />

      <AppButton color="primary" onPress={handleSubmit(onButtonPress)}>
        Continue
      </AppButton>
      <Spacer height={size.spacing.xs} />
    </>
  );
};
