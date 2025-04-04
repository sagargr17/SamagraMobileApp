import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, StyleSheet, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AppButton from '../../Components/Elements/Button';
import {ErrorText} from '../../Components/Elements/ErrorText';
import {Input} from '../../Components/Elements/Input';
import {Spacer} from '../../Components/Elements/Spacer';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {OnBoardingLayout} from '../../Components/Layout/OnBoardingLayout';
import {ContinueDivider} from '../../Components/Sections/ContinueDivider';
import {SocialForm} from '../../Components/Sections/SocialForm';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import Authenticator from '../../client/Token/Authenticator';
import {SamagraScaller} from '../../Utilities/CustomMethods';

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
    <OnBoardingLayout>
      <View style={styles.imageContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../Assets/PNG/Sign.png')}
          style={[styles.image]}></FastImage>
      </View>
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
            placeholder="*********"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
      <Spacer height={10} />
      <View style={styles.extra}>
        <Pressable onPress={() => navigation.navigate('OtpScreen')}>
          <TextComponet
            customStyle={{
              color: 'blue',
            }}
            title="Forgot Password"
            fontVariant="medium"></TextComponet>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
          <TextComponet
            customStyle={{
              color: 'blue',
            }}
            title="Don’t have an Account?"
            fontVariant="medium"></TextComponet>
        </Pressable>

        {/* <Pressable
              onPress={() => navigation.navigate('SignUpScreen')}></Pressable> */}
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
  image: {
    height: SamagraScaller({
      value: 190,
      scaleBy: 'height',
    }),
    width: SamagraScaller({
      value: 180,
      scaleBy: 'width',
    }),
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // paddingHorizontal: SamagraScaller({
    //   value: 10,
    //   scaleBy: 'height',
    // }),
  },
});
