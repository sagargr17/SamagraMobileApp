import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import Authenticator from '../../client/Token/Authenticator';
import AppButton from '../../Components/Elements/Button';
import {ErrorText} from '../../Components/Elements/ErrorText';
import {Input} from '../../Components/Elements/Input';
import {Spacer} from '../../Components/Elements/Spacer';
import {AppText} from '../../Components/Elements/AppText';
import {ContinueDivider} from '../../Components/Elements/ContinueDivider';
import {ScrollableLayout} from '../../Layout/ScreenLayout/ScrollableLayout';
import {SocialForm} from '../../Components/Organism/SocialForm';
import {userRules} from '../../Constants/UI/Rules';
import {OnBoardingStackNavigationProp} from '../../Navigators/Stack/OnBoardingStackNavigator';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../StateManagement/hooks';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {Icon, ProgressBar, TextInput} from 'react-native-paper';
import {size} from '../../Prefrences/Prefrences';

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
              <Input
                label="Username"
                placeholder="Username"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.userName && <ErrorText>{errors.userName?.message}</ErrorText>}
          <Controller
            control={control}
            name="password"
            rules={userRules.password}
            render={({field: {onChange, value}}) => (
              <Input
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
          {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
          <Spacer height={10} />
          <View style={styles.extra}>
            <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
              <AppText
                fontSizeVariant="regular"
                customStyle={{
                  color: '#4A739C',
                }}
                title="Forgot Password"
                fontVariant="medium"></AppText>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('ProfileSetupScreen')}>
              <AppText
                fontSizeVariant="caption"
                customStyle={{
                  color: '#4A739C',
                }}
                title="Don’t have an Account?"
                fontVariant="medium"></AppText>
            </Pressable>
          </View>
          <Spacer height={size.spacing.l} />
          <AppButton color="primary" onPress={handleSubmit(signIn)}>
            Login
          </AppButton>
          {/* <Spacer /> */}
          <Spacer height={size.spacing.m} />
          <ContinueDivider />
          <Spacer height={size.spacing.m} />
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
    fontSize: heightPercentageToDP(2.2),
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
