import React from 'react';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {View, Text, StyleSheet} from 'react-native';
import PhoneInput from '../../Components/elements/PhoneInput';
import AppButton from '../../Components/elements/Button';
import {Spacer} from '../../Components/elements/Spacer';
import {Controller, useForm} from 'react-hook-form';
import {ErrorText} from '../../Components/elements/ErrorText';
import {SocialForm} from '../../Components/Sections/SocialForm';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

interface OnBoardingScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

interface SignUpData {
  phone: string;
}

export const SignUpScreen: React.FC<OnBoardingScreenProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpData>();

  const onButtonPress = (data: SignUpData) => {
    console.log(data);
  };

  const goLogin = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Lets Get Started</Text>
      <Spacer />
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
      <AppButton onPress={handleSubmit(onButtonPress)}>Continue</AppButton>
      <Spacer />
      <View style={styles.wrapperLines}>
        <View style={styles.line} />
        <Text style={styles.content}>OR CONTINUE WITH</Text>
        <View style={styles.line} />
      </View>
      <Spacer />
      <AppButton mode="outlined" onPress={goLogin}>
        Continue with Email
      </AppButton>
      <Spacer />
      <SocialForm />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: heightPercentageToDP(4),
    fontWeight: 600,
    marginBottom: heightPercentageToDP(4),
    color: '#1D1D1D',
  },
  wrapper: {
    flex: 1,
    paddingTop: heightPercentageToDP(10),
    paddingLeft: heightPercentageToDP(2),
    paddingRight: heightPercentageToDP(2),
    backgroundColor: '#FDFDFD',
  },
  wrapperLines: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(4),
  },
  line: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#C0C0C0',
  },
  content: {
    fontSize: heightPercentageToDP(1.5),
    color: '#787878',
  },
});
