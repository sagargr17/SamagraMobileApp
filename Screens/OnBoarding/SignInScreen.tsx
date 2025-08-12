import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import Authenticator from '../../client/Token/Authenticator';
import { AppTextElement } from '../../Components/Elements/AppTextElement';
import AppButtonElement from '../../Components/Elements/ButtonElement';
import { ContinueDividerElement } from '../../Components/Elements/ContinueDividerElement';
import { ErrorTextElement } from '../../Components/Elements/ErrorTextElement';
import { InputElement } from '../../Components/Elements/InputElement';
import { SpacerElement } from '../../Components/Elements/SpacerElement';
import { SocialForm } from '../../Components/Organism/OnBoarding/SocialFormOrganism';
import { userRules } from '../../Constants/UI/Rules';
import { OnBoardingStackNavigationProp } from '../../Navigators/Stack/OnBoardingStackNavigator';
import { size } from '../../Prefrences/Prefrences';
import { showLoader } from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import { useAppDispatch } from '../../StateManagement/hooks';
import { AreaMapper } from '../../Utilities/CustomMethods';

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
  const dispatch = useAppDispatch();
  const [isTextVisible, setIsTextvisible] = useState<boolean>(false);

  const signIn = async (data: SignInData) => {
    dispatch(showLoader());
    await Authenticator(data.userName, data.password);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          paddingHorizontal: size.spacing.s,
        }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust as needed
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            name="userName"
            rules={userRules.userName}
            render={({field: {onChange, value}}) => (
              <InputElement
                label="Username"
                placeholder="Username"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.userName && <ErrorTextElement>{errors.userName?.message}</ErrorTextElement>}
          <Controller
            control={control}
            name="password"
            rules={userRules.password}
            render={({field: {onChange, value}}) => (
              <InputElement
                secureTextEntry={!isTextVisible}  
                label="Password"
                placeholder="*********"
                value={value}
                onChangeText={onChange}
                right={
                  <TextInput.Icon
                    color={'#4A739C'}
                    rippleColor={'#4A739C'}
                    onPress={() => setIsTextvisible(!isTextVisible)}
                    icon={isTextVisible ? 'eye-outline' : 'eye-off'}
                    size={size.iconSize.small}></TextInput.Icon>
                }
              />
            )}
          />
          {errors.password && <ErrorTextElement>{errors.password?.message}</ErrorTextElement>}
          <SpacerElement height={10} />
          <View style={styles.extra}>
            <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
              <AppTextElement
                fontSizeVariant="regular"
                customStyle={{
                  color: '#4A739C',
                }}
                title="Forgot Password"
                fontVariant="medium"></AppTextElement>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('ProfileSetupScreen')}>
              <AppTextElement
                fontSizeVariant="caption"
                customStyle={{
                  color: '#4A739C',
                }}
                title="Don’t have an Account?"
                fontVariant="medium"></AppTextElement>
            </Pressable>
          </View>
          <SpacerElement height={size.spacing.l} />
          <AppButtonElement color="primary" onPress={handleSubmit(signIn)}>
            Login
          </AppButtonElement>
          {/* <Spacer /> */}
          <SpacerElement height={size.spacing.m} />
          <ContinueDividerElement />
          <SpacerElement height={size.spacing.m} />
          <SocialForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  header: {
    fontSize: AreaMapper({value: 2.2}),
    fontWeight: 600,
    textAlign: 'center',
    color: '#1D1D1D',
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});
