import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
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
    // <KeyboardAvoidingView
    //   style={styles.keyboardContainer}
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    //   <ScrollView automaticallyAdjustKeyboardInsets={true}>
    //     <View style={styles.wrapper}>
    //       <Text style={styles.header}>Login With UserName</Text>
    //       <Spacer />
    //       <Controller
    //         control={control}
    //         name="userName"
    //         rules={{
    //           required: 'UserName address is required',
    //         }}
    //         render={({field: {onChange, value}}) => (
    //           <View>
    //             <Text style={styles.inputLabel}>User Name</Text>
    //             <View
    //               style={[
    //                 styles.inputWrapper,
    //                 !!errors.userName && styles.inputError,
    //               ]}>
    //               <TextInput
    //                 placeholder="User Name"
    //                 mode="outlined"
    //                 outlineColor="transparent"
    //                 activeOutlineColor="transparent"
    //                 underlineColor="transparent"
    //                 activeUnderlineColor="transparent"
    //                 style={styles.input}
    //                 value={value}
    //                 onChangeText={onChange}
    //               />
    //             </View>
    //           </View>
    //         )}
    //       />
    //       {errors.userName && <ErrorText>{errors.userName?.message}</ErrorText>}
    //       <Spacer height={20} />
    //       <Controller
    //         control={control}
    //         name="password"
    //         rules={{
    //           required: 'Password is required',
    //         }}
    //         render={({field: {onChange, value}}) => (
    //           <View>
    //             <Text style={styles.inputLabel}>Password</Text>
    //             <View
    //               style={[
    //                 styles.inputWrapper,
    //                 !!errors.password && styles.inputError,
    //               ]}>
    //               <TextInput
    //                 placeholder="Password"
    //                 mode="outlined"
    //                 outlineColor="transparent"
    //                 activeOutlineColor="transparent"
    //                 underlineColor="transparent"
    //                 activeUnderlineColor="transparent"
    //                 style={styles.input}
    //                 value={value}
    //                 onChangeText={onChange}
    //               />
    //             </View>
    //           </View>
    //         )}
    //       />
    //       {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
    //       <Spacer />
    //       <View style={styles.extra}>
    //         <Text style={styles.extraLink}>Forgot Password?</Text>
    //         {/* <Text style={styles.extraLink}>Don't have an Account?</Text> */}
    //         <Link style={styles.extraLink} screen={'SignUpScreen'}>
    //           Don't have an Account?
    //         </Link>
    //       </View>
    //       <Spacer />
    //       <AppButton onPress={handleSubmit(signIn)}>Login</AppButton>
    //       <Spacer />
    //       <View style={styles.wrapperLines}>
    //         <View style={styles.line} />
    //         <Text style={styles.content}>OR CONTINUE WITH</Text>
    //         {/* <View style={styles.line} /> */}
    //       </View>
    //       <Spacer />
    //       <View style={styles.social}>
    //         <View style={styles.socialItem}>
    //           {/* <Text>A</Text> */}
    //           <Link style={styles.extraLink} screen={'OtpScreen'}>
    //             A
    //           </Link>
    //         </View>
    //         <View style={styles.socialItem}>
    //           <Text>G</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </ScrollView>
    // </KeyboardAvoidingView>
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
