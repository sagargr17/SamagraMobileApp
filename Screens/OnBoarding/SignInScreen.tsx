import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Logos } from '../../Assets/SVG/Exports/Exports';
import Authenticator from '../../client/Token/Authenticator';
import AppButton from '../../Components/Elements/Button';
import { ErrorText } from '../../Components/Elements/ErrorText';
import { Input } from '../../Components/Elements/Input';
import { Spacer } from '../../Components/Elements/Spacer';
import { TextComponet } from '../../Components/Elements/TextComponet';
import { OnBoardingLayout } from '../../Components/Layout/OnBoardingLayout';
import { ContinueDivider } from '../../Components/Sections/ContinueDivider';
import { SocialForm } from '../../Components/Sections/SocialForm';
import { OnBoardingStackNavigationProp } from '../../Navigators/Stack/OnBoardingStackNavigator';
import { showLoader } from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import { useAppDispatch } from '../../StateManagement/hooks';
import { AreaMapper } from '../../Utilities/CustomMethods';
import { userRules } from '../../GlobalParams/Forms/Rules';

interface SignInScreenProps {
  navigation: OnBoardingStackNavigationProp<'SignUpScreen'>;
}

interface SignInData {
  userName: string;
  password: string;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [isButtonPressedLoading, setIsButtonPressedloading] =
    useState<boolean>(false);
  const {LoginAvatar} = Logos;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInData>();
  const dispatch = useAppDispatch();

  const signIn = async (data: SignInData) => {
    dispatch(showLoader());
    await Authenticator(data.userName, data.password);
  };

  return (
    <>
      <OnBoardingLayout>
        <GestureHandlerRootView
          style={{
            flex: 1,
            marginTop: AreaMapper({
              value: 20,
              scaleBy: 'height',
            }),
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flex: 1,
            }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust as needed
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Controller
                control={control}
                name="userName"
                rules={userRules.userName}
                render={({field: {onChange, value}}) => (
                  <Input
                    label="Username"
                    placeholder="Username"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.userName && (
                <ErrorText>{errors.userName?.message}</ErrorText>
              )}
              <Spacer height={20} />
              <Controller
                control={control}
                name="password"
                rules={userRules.password}
                render={({field: {onChange, value}}) => (
                  <Input
                    label="Password"
                    placeholder="*********"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password && (
                <ErrorText>{errors.password?.message}</ErrorText>
              )}
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
              </View>
              <Spacer />
              <AppButton color="primary" onPress={handleSubmit(signIn)}>
                Logins
              </AppButton>
              <Spacer />
              <ContinueDivider />
              <Spacer />
              <SocialForm />
            </ScrollView>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </OnBoardingLayout>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
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

  image: {
    height: AreaMapper({
      value: 190,
      scaleBy: 'height',
    }),
    width: AreaMapper({
      value: 180,
      scaleBy: 'width',
    }),
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: AreaMapper({
      value: 5,
      scaleBy: 'height',
    }),
    // flex: 1,
    // paddingHorizontal: SamagraScaller({
    //   value: 10,
    //   scaleBy: 'height',
    // }),
  },
});
