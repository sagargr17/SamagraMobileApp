import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import PhoneInput from '../../../Components/elements/PhoneInput';
import AppButton from '../../../Components/elements/Button';
import {Spacer} from '../../../Components/elements/Spacer';
import {ErrorText} from '../../../Components/elements/ErrorText';

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
        rules={{
          required: 'Phone number is required',
          minLength: {
            value: 10,
            message: 'Phone number must be at least 10 digits',
          },
        }}
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
      <AppButton color="secondary" onPress={handleSubmit(onButtonPress)}>
        Continue
      </AppButton>
    </>
  );
};
