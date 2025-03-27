import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {Controller, useForm} from 'react-hook-form';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Authenticator from '../../Client/Token/Authenticator';
import AppButton from '../../Components/elements/Button';
import {Spacer} from '../../Components/elements/Spacer';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import {SocialForm} from '../../Components/Sections/SocialForm';
import {ContinueDivider} from '../../Components/Sections/ContinueDivider';
import {ErrorText} from '../../Components/elements/ErrorText';

interface SignInScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

interface SignInData {
  userName: string;
  password: string;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInData>();

  const signIn = async (data: SignInData) => {
    console.log('Login Data:', data.userName, data.password);
    let login = await Authenticator(data.userName, data.password);
    console.log('Login Result:::', login);
  };

  return (
    <OnBoardingLayout>
      <Text style={styles.header}>Login With Email</Text>
      <Spacer />
      <Controller
        control={control}
        name="userName"
        rules={{
          required: 'Username address is required',
        }}
        render={({field: {onChange, value}}) => (
          <View>
            <Text style={styles.inputLabel}>User Name</Text>
            <View
              style={[
                styles.inputWrapper,
                !!errors.userName && styles.inputError,
              ]}>
              <TextInput
                placeholder="User Name"
                mode="outlined"
                outlineColor="transparent"
                activeOutlineColor="transparent"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            </View>
          </View>
        )}
      />
      {errors.userName && <ErrorText>{errors.userName?.message}</ErrorText>}
      <Spacer height={20} />
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
        }}
        render={({field: {onChange, value}}) => (
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                !!errors.password && styles.inputError,
              ]}>
              <TextInput
                placeholder="Password"
                mode="outlined"
                outlineColor="transparent"
                activeOutlineColor="transparent"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            </View>
          </View>
        )}
      />
      {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
      <Spacer />
      <View style={styles.extra}>
        <Pressable onPress={() => navigation.navigate('OtpScreen')}>
          <Text style={styles.extraLink}>Forgot Password?</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.extraLink}>Don't have an Account?</Text>
        </Pressable>
      </View>
      <Spacer />
      <AppButton color="light" onPress={handleSubmit(signIn)}>
        Login
      </AppButton>
      <Spacer />
      <ContinueDivider />
      <Spacer />
      <SocialForm />
    </OnBoardingLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: heightPercentageToDP(2),
    fontWeight: 600,
    textAlign: 'center',
    color: '#1D1D1D',
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extraLink: {
    color: '#2A56FE',
    fontSize: heightPercentageToDP(1.6),
  },
  // Input
  inputLabel: {
    fontSize: heightPercentageToDP(1.8),
    color: '#2D2D2D',
    marginBottom: heightPercentageToDP(1),
  },
  inputWrapper: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: heightPercentageToDP(1),
  },
  input: {
    backgroundColor: '#FDFDFD',
  },
  inputError: {
    borderColor: 'red',
  },
});
