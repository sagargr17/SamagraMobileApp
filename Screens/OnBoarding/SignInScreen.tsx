import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {Controller, useForm} from 'react-hook-form';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AppButton from '../../Components/Elements/Button';
import {Spacer} from '../../Components/Elements/Spacer';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import {SocialForm} from '../../Components/Sections/SocialForm';
import {ContinueDivider} from '../../Components/Sections/ContinueDivider';
import {ErrorText} from '../../Components/Elements/ErrorText';
import {Input} from '../../Components/Elements/Input';
import Authenticator from '../../client/Token/Authenticator';
import {useTheme} from '@react-navigation/native';

interface SignInScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

interface SignInData {
  userName: string;
  password: string;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
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
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <OnBoardingLayout>
          <Text style={[styles.header, {color: colors.text}]}>
            Login With Email
          </Text>
          <Spacer />
          <Controller
            control={control}
            name="userName"
            rules={{
              required: 'Username address is required',
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label="Username"
                placeholder="Username"
                value={value}
                onChangeText={onChange}
              />
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
              <Input
                label="Password"
                placeholder="Password"
                value={value}
                onChangeText={onChange}
              />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 2,
  },
  header: {
    fontSize: heightPercentageToDP(2.2),
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
});
