import React from 'react';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {View, Text, StyleSheet} from 'react-native';
import AppButton from '../../Components/elements/Button';
import {Spacer} from '../../Components/elements/Spacer';
import {Controller, useForm} from 'react-hook-form';
import {ErrorText} from '../../Components/elements/ErrorText';
import {TextInput} from 'react-native-paper';
import {Link} from '@react-navigation/native';
import Authenticator from '../../Client/Token/Authenticator';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import { SocialForm } from '../../Components/Sections/SocialForm';

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
    <View style={styles.wrapper}>
      <Text style={styles.header}>Login With UserName</Text>
      <Spacer />
      <Controller
        control={control}
        name="userName"
        rules={{
          required: 'UserName address is required',
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
        <Text style={styles.extraLink}>Forgot Password?</Text>
        {/* <Text style={styles.extraLink}>Don't have an Account?</Text> */}
        <Link style={styles.extraLink} screen={'SignUpScreen'}>
          Don't have an Account?
        </Link>
      </View>
      <Spacer />
      <AppButton onPress={handleSubmit(signIn)}>Login</AppButton>
      <Spacer />
      <View style={styles.wrapperLines}>
        <View style={styles.line} />
        <Text style={styles.content}>OR CONTINUE WITH</Text>
        {/* <View style={styles.line} /> */}
      </View>
      <Spacer />
      <SocialForm />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 39,
    fontWeight: 600,
    marginBottom: 30,
    color: '#1D1D1D',
  },
  wrapper: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FDFDFD',
  },
  wrapperLines: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  line: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#C0C0C0',
  },
  content: {
    fontSize: 14,
    color: '#787878',
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extraLink: {
    color: '#2A56FE',
    fontSize: 16,
  },
  // Input
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#FDFDFD',
  },
  inputError: {
    borderColor: 'red',
  },
});
