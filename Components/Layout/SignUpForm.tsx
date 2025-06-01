import React from 'react';
import {Controller, Form, useForm} from 'react-hook-form';
import PhoneInput from '../Elements/PhoneInput';
import AppButton from '../Elements/Button';
import {Spacer} from '../Elements/Spacer';
import {ErrorText} from '../Elements/ErrorText';
import {Button} from 'react-native';
import {userRules} from '../../GlobalParams/Forms/Rules';

interface SignUpData {
  phone: string;
}

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpData>();

  const onButtonPress = (data: SignUpData) => {
    console.log(data);
  };

  return (
    <>
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
      <Spacer />

      <AppButton color="primary" onPress={handleSubmit(onButtonPress)}>
        Continue
      </AppButton>
    </>
  );
};
